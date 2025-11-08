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
import { mutate } from "swr";
import RelationshipTypeForm from "../forms/RelationshipTypeForm";
import { useRelationshipTypeApi, useRelationshipTypes } from "../hooks";
import { RelationshipType } from "../types";
import { confirmDelete } from "../utils/utils";

type RelationshipTypesPageProps = {};

const RelationshipTypesPage: React.FC<RelationshipTypesPageProps> = ({}) => {
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const bgColor =
    colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6];
  const relationshipTypesAsync = useRelationshipTypes();
  const { deleteRelationshipType, mutate } = useRelationshipTypeApi();
  const title = "Relationship types";

  const handleAddOrupdate = (relationshipType?: RelationshipType) => {
    const dispose = launchWorkspace(
      <RelationshipTypeForm
        relationshipType={relationshipType}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: relationshipType
          ? "Update Relationship type"
          : "Add Relationship type",
      }
    );
  };

  const actions: ColumnDef<RelationshipType> = {
    id: "actions",
    cell({ row }) {
      const relationshipType = row.original;
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
              onClick={() => handleAddOrupdate(relationshipType)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<TablerIcon name="trash" size={14} />}
              onClick={() =>
                confirmDelete("relationship type", async () => {
                  await deleteRelationshipType(relationshipType.id, false);
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
          title="Relationship Types"
          subTitle={"Property relationship types"}
          icon={"sitemap"}
        />
      </Box>
      <Paper bg={bgColor} p={"md"}>
        <StateFullDataTable
          {...relationshipTypesAsync}
          data={relationshipTypesAsync.relationshipTypes}
          columns={[...columns, actions]}
          onAdd={() => handleAddOrupdate()}
          title={title}
          withColumnViewOptions
        />
      </Paper>
    </Stack>
  );
};

export default RelationshipTypesPage;
const columns: ColumnDef<RelationshipType>[] = [
  {
    accessorKey: "aIsToB",
    header: "A is to B",
  },
  {
    accessorKey: "bIsToA",
    header: "B is to A",
  },
  {
    accessorKey: "description",
    header: "Description",
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
