import {
  DashboardPageHeader,
  DataTableColumnHeader,
  launchWorkspace,
  StateFullDataTable,
  TablerIcon,
} from "@havena/esm-core-components";
import {
  ActionIcon,
  Box,
  Menu,
  Paper,
  Stack,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import FileUsageRulesExpandedRow from "../components/FileUsageRulesExpandedRow";
import FileusageScopeForm from "../forms/FileusageScopeForm";
import { useFileUsageScope, useFileUsageScopeApi } from "../hooks";
import { FileUsageScope } from "../types";
import { confirmDelete } from "../utils/utils";

const FileUsageScopePage = () => {
  const usageRulesAsync = useFileUsageScope();
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const bgColor =
    colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6];
  const { deleteFileUsageScope, mutate } = useFileUsageScopeApi();

  const handleAddOrupdate = (scope?: FileUsageScope) => {
    const dismiss = launchWorkspace(
      <FileusageScopeForm scope={scope} onCloseWorkspace={() => dismiss()} />,
      { title: scope ? "Update scope" : "Add scope" }
    );
  };

  const actions: ColumnDef<FileUsageScope> = {
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
                confirmDelete("category", async () => {
                  await deleteFileUsageScope(rule.id, true);
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
    <Stack gap={"xl"}>
      <Box>
        <DashboardPageHeader
          title="File Usage Configuration"
          subTitle={"Uploaded files usage scope and rule configuration"}
          icon={"listTree"}
        />
      </Box>
      <Paper bg={bgColor} p={"md"}>
        <StateFullDataTable
          {...usageRulesAsync}
          data={usageRulesAsync.scope}
          columns={[...columns, actions]}
          onAdd={() => handleAddOrupdate()}
          withColumnViewOptions
          title="File Usage Configuration"
          renderExpandedRow={({ original }) => (
            <FileUsageRulesExpandedRow scope={original} />
          )}
        />
      </Paper>
    </Stack>
  );
};

export default FileUsageScopePage;
const columns: Array<ColumnDef<FileUsageScope>> = [
  {
    id: "expand",
    header: ({ table }) => {
      const allRowsExpanded = table.getIsAllRowsExpanded();
      return (
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => table.toggleAllRowsExpanded(!allRowsExpanded)}
          style={{ cursor: "pointer" }}
          aria-label="Expand all"
        >
          <TablerIcon
            name={allRowsExpanded ? "chevronUp" : "chevronDown"}
            size={16}
          />
        </ActionIcon>
      );
    },
    cell: ({ row }) => {
      const rowExpanded = row.getIsExpanded();
      return (
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => row.toggleExpanded(!rowExpanded)}
          style={{ cursor: "pointer" }}
          aria-label="Expand Row"
        >
          <TablerIcon
            name={rowExpanded ? "chevronUp" : "chevronDown"}
            size={16}
          />
        </ActionIcon>
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 10,
  },
  {
    accessorKey: "modelName",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Model Name" />;
    },
  },
  {
    accessorKey: "purpose",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Purpose" />;
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
