import {
  DataTableColumnHeader,
  StateFullDataTable,
} from "@havena/esm-core-components";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { AppService, Endpoint } from "../types";
import { Anchor, Paper, Stack, Title } from "@mantine/core";

type AppServiceResourcesExpandedRowProps = {
  service: AppService;
};

const AppServiceResourcesExpandedRow: FC<
  AppServiceResourcesExpandedRowProps
> = ({ service }) => {
  return (
    <Paper p={"md"}>
      <Stack gap={"md"}>
        <Title order={4}>Service Endpoints</Title>
        <StateFullDataTable
          columns={columns}
          data={service.endpoints}
          withColumnViewOptions
        />
      </Stack>
    </Paper>
  );
};

export default AppServiceResourcesExpandedRow;
const columns: Array<ColumnDef<Endpoint>> = [
  {
    accessorKey: "protocol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Protocol" />
    ),
  },
  {
    accessorKey: "host",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Host" />
    ),
  },
  {
    accessorKey: "port",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Port" />
    ),
  },
  {
    id: "url",
    header: "URL",
    cell({ row: { original: endpoint } }) {
      const url = `${endpoint.protocol}://${endpoint.host}:${endpoint.port}`;
      return (
        <Anchor href={url} target="_blank">
          {url}
        </Anchor>
      );
    },
  },
];
