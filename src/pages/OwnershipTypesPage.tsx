import {
  DashboardPageHeader,
  DataTableColumnHeader,
  launchWorkspace,
  StateFullDataTable,
  TablerIcon,
} from "@hive/esm-core-components";
import { ActionIcon, Badge, Box, Group, Stack, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import OwnershipTypeForm from "../forms/OwnershipTypeForm";
import { useOwnershipTypes } from "../hooks";
import { OwnershipType } from "../types";
type OwnershipTypesPageProps = {};

const OwnershipTypesPage: FC<OwnershipTypesPageProps> = ({}) => {
  const ownershipTypesAsync = useOwnershipTypes();

  const handleAddOrupdate = (ownershipType?: OwnershipType) => {
    const dispose = launchWorkspace(
      <OwnershipTypeForm
        ownershipType={ownershipType}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: ownershipType
          ? "Update Financing option"
          : "Add Financing option",
        width: "extra-wide",
        expandable: true,
      }
    );
  };
  const handleDelete = (ownershipType: OwnershipType) => {
    openConfirmModal({
      title: "Delete ownership type",
      children: (
        <Text>
          Are you sure you want to delete this role.This action is destructive
          and will delete all data related to role
        </Text>
      ),
      labels: {
        confirm: "Delete ownership type",
        cancel: "No don't delete it",
      },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm() {
        // TODO Implement delete
      },
    });
  };
  return (
    <Stack gap={"xl"}>
      <Box>
        <DashboardPageHeader
          title="Ownership Types"
          subTitle={"Sale Listing Ownership Types"}
          icon={"userHexagon"}
        />
      </Box>
      <StateFullDataTable
        onAdd={() => handleAddOrupdate()}
        columns={[
          ...columns,
          {
            id: "actions",
            header: "Actions",
            cell({ row }) {
              const ownershiptype = row.original;
              return (
                <Group>
                  <Group>
                    <ActionIcon
                      variant="outline"
                      aria-label="Settings"
                      color="green"
                      onClick={() => handleAddOrupdate(ownershiptype)}
                    >
                      <TablerIcon
                        name="edit"
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="outline"
                      aria-label="Settings"
                      color="red"
                      onClick={() => handleDelete(ownershiptype)}
                    >
                      <TablerIcon
                        name="trash"
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Group>
                </Group>
              );
            },
          },
        ]}
        {...ownershipTypesAsync}
        withColumnViewOptions
      />
    </Stack>
  );
};

export default OwnershipTypesPage;
const columns: ColumnDef<OwnershipType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "description",
  },

  {
    accessorKey: "voided",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell({ getValue }) {
      const status = !getValue<boolean>();
      return (
        <Badge color={status ? "teal" : "red"} variant={"outline"}>
          {status ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
    cell({ getValue }) {
      const created = getValue<string>();
      return new Date(created).toDateString();
    },
  },
];
