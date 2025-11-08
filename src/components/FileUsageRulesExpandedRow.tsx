import {
  TablerIcon,
  StateFullDataTable,
  DataTableColumnHeader,
  launchWorkspace,
} from "@havena/esm-core-components";
import {
  useComputedColorScheme,
  useMantineTheme,
  Menu,
  ActionIcon,
  Paper,
} from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { useFileUsageRules, useFileUsageRuleApi } from "../hooks";
import { FileUsageRule, FileUsageScope } from "../types";
import { confirmDelete } from "../utils/utils";
import FileUsageRuleForm from "../forms/FileUsageRuleForm";

type Props = {
  scope: FileUsageScope;
};

const FileUsageRulesExpandedRow: FC<Props> = ({ scope }) => {
  const usageRulesAsync = useFileUsageRules({ scopeId: scope.id });
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const bgColor =
    colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6];
  const { deleteFileUsageRule, mutate } = useFileUsageRuleApi();

  const handleAddOrupdate = (rule?: FileUsageRule) => {
    const dismiss = launchWorkspace(
      <FileUsageRuleForm
        scope={scope}
        rule={rule}
        onCloseWorkspace={() => dismiss()}
      />,
      { title: rule ? "Update rule" : "Add rule" }
    );
  };
  const actions: ColumnDef<FileUsageRule> = {
    id: "actions",
    cell({ row }) {
      const rule = row.original;
      return (
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" aria-label="actions">
              <TablerIcon
                name="dots"
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Divider />
            <Menu.Item
              leftSection={<TablerIcon name="edit" size={14} />}
              onClick={() => handleAddOrupdate(rule)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<TablerIcon name="trash" size={14} />}
              onClick={() =>
                confirmDelete("file usage rule", async () => {
                  await deleteFileUsageRule(rule.id, true);
                  mutate();
                })
              }
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    },
  };
  return (
    <Paper bg={bgColor} p={"md"}>
      <StateFullDataTable
        {...usageRulesAsync}
        data={usageRulesAsync.rules}
        columns={[...columns, actions]}
        onAdd={() => handleAddOrupdate()}
        withColumnViewOptions
        title={`${scope.modelName} ${scope.purpose} Restrictions`}
      />
    </Paper>
  );
};

export default FileUsageRulesExpandedRow;
const columns: Array<ColumnDef<FileUsageRule>> = [
  { accessorKey: "maxFiles", header: "Maximum files" },
  {
    accessorKey: "tier",
    header: "Tier",
    cell(props) {
      return "TODO: implement after subscription service";
    },
  },
  {
    accessorKey: "voided",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Voided" />;
    },
    cell({ getValue }) {
      const voided = getValue<boolean>();
      return (
        <TablerIcon
          name={voided ? "circleCheck" : "circleX"}
          color={voided ? "teal" : "red"}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
];
