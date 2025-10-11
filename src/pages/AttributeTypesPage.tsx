import {
  DashboardPageHeader,
  DataTableColumnHeader,
  launchWorkspace,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
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
import AttributeTypeForm from "../forms/AttributeTypeForm";
import { useAttributeTypeApi, useAttributeTypes } from "../hooks";
import { AttributeType } from "../types";
import { confirmDelete } from "../utils/utils";
type AttributeTypesPageProps = {};

const AttributeTypesPage: React.FC<AttributeTypesPageProps> = ({}) => {
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const bgColor =
    colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6];
  const attributeTypesAsync = useAttributeTypes();
  const { deleteAttributeType, mutate } = useAttributeTypeApi();
  const handleAddOrupdate = (attributeType?: AttributeType) => {
    const dispose = launchWorkspace(
      <AttributeTypeForm
        attributeType={attributeType}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: attributeType ? "Update Attribute type" : "Add Attribute type",
      }
    );
  };

  const actions: ColumnDef<AttributeType> = {
    id: "actions",
    cell({ row }) {
      const attributeType = row.original;
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
              onClick={() => handleAddOrupdate(attributeType)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<TablerIcon name="trash" size={14} />}
              onClick={() =>
                confirmDelete("attribute type", async () => {
                  await deleteAttributeType(attributeType.id);
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
          title="Attribute Types"
          subTitle={"Property Attribute types"}
          icon={"tree"}
        />
      </Box>
      <Paper bg={bgColor} p={"md"}>
        <StateFullDataTable
          {...attributeTypesAsync}
          data={attributeTypesAsync.attributeTypes}
          columns={[...columns, actions]}
          onAdd={() => handleAddOrupdate()}
          withColumnViewOptions
          title="Attribute types"
        />
      </Paper>
    </Stack>
  );
};

export default AttributeTypesPage;

const columns: ColumnDef<AttributeType>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell({ getValue }) {
      const icon = getValue<AttributeType["icon"]>();
      if (icon) return <TablerIcon name={icon?.name as any} size={16} />;
      return <TablerIcon size={16} name="tournament" />;
    },
  },
  {
    accessorKey: "name",
    header: "Amenity",
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
