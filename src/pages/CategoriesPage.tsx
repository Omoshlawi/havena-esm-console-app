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
import CategoryForm from "../forms/CategoryForm";
import { useCategories, useCategoryApi } from "../hooks";
import { Category } from "../types";
import { confirmDelete } from "../utils/utils";

type CategoriesPageProps = {};

const CategoriesPage: React.FC<CategoriesPageProps> = ({}) => {
  const categoriesAsync = useCategories();
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const bgColor =
    colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6];
  const { deleteCategory, mutate } = useCategoryApi();
  const handleAddOrupdate = (category?: Category) => {
    const dispose = launchWorkspace(
      <CategoryForm
        category={category}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: category ? "Update Category" : "Add Category",
      }
    );
  };

  const actions: ColumnDef<Category> = {
    id: "actions",
    cell({ row }) {
      const category = row.original;
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
              onClick={() => handleAddOrupdate(category)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<TablerIcon name="trash" size={14} />}
              onClick={() =>
                confirmDelete("category", async () => {
                  await deleteCategory(category.id, true);
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
          title="Categories"
          subTitle={"Property Categories"}
          icon={"category"}
        />
      </Box>
      <Paper bg={bgColor} p={"md"}>
        <StateFullDataTable
          {...categoriesAsync}
          data={categoriesAsync.categories}
          columns={[...columns, actions]}
          onAdd={() => handleAddOrupdate()}
          withColumnViewOptions
          title="Categories"
        />
      </Paper>
    </Stack>
  );
};

export default CategoriesPage;

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell({ getValue }) {
      const icon = getValue<Category["icon"]>();
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
