import {
  DashboardPageHeader,
  DataTable,
  DataTableColumnHeader,
  EmptyState,
  ErrorState,
  TablerIcon,
  TableSkeleton,
  When,
} from "@hive/esm-core-components";
import { ActionIcon, Badge, Box, Group, Stack } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import AppServiceResourcesExpandedRow from "../components/AppServiceResourcesExpandedRow";
import { useAppServices } from "../hooks";
import { AppService } from "../types";
import { formatDate } from "../utils/helpers";

const AppServicesPage = () => {
  const { mutate, ...state } = useAppServices();

  return (
    <Stack>
      <Box>
        <DashboardPageHeader
          title="Service"
          subTitle={"Application service"}
          icon={"server2"}
        />
      </Box>
      <When
        asyncState={{ ...state, data: state.appServices }}
        loading={() => <TableSkeleton />}
        error={(e) => <ErrorState error={e} />}
        success={(data) => {
          if (!data.length) return <EmptyState />;
          return (
            <DataTable
              columns={columns}
              data={data}
              renderExpandedRow={(row) => (
                <AppServiceResourcesExpandedRow service={row.original} />
              )}
              withColumnViewOptions
            />
          );
        }}
      />
    </Stack>
  );
};

export default AppServicesPage;

const columns: ColumnDef<AppService>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={Boolean(
  //           table.getIsAllPageRowsSelected() ||
  //             (table.getIsSomePageRowsSelected() && "indeterminate") // Inderterminate should patially check the checkbox
  //         )}
  //         onChange={(value) =>
  //           table.toggleAllPageRowsSelected(value.currentTarget.checked)
  //         }
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onChange={(e) => row.toggleSelected(e.currentTarget.checked)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    id: "expand",
    header: ({ table }) => {
      const allRowsExpanded = table.getIsAllRowsExpanded();
      //   const someRowsExpanded = table.getIsSomeRowsExpanded();
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
    size: 0,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "version",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Version" />
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell({ getValue }) {
      const tags = getValue<string[]>();
      return (
        <Group gap={"xs"}>
          {tags.map((tag, i) => (
            <Badge key={i} size="xs" variant="light">
              {tag}
            </Badge>
          ))}
        </Group>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Stamp" />
    ),
    cell({ row, getValue }) {
      const timestamp = parseInt(getValue<string>());
      return formatDate(new Date(timestamp).toISOString());
    },
  },
];
