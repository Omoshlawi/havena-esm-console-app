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
import AmenityForm from "../forms/AmenityForm";
import { useAmenities, useAmenitiesApi } from "../hooks";
import { Amenity } from "../types";
import { confirmDelete } from "../utils/utils";
type AmenitiespageProps = {};

const Amenitiespage: React.FC<AmenitiespageProps> = ({}) => {
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const bgColor =
    colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6];
  const amenitiesAsync = useAmenities();
  const { deleteAmenity, mutate, restoreAmenity } = useAmenitiesApi();
  const handleAddOrupdate = (amenity?: Amenity) => {
    const dispose = launchWorkspace(
      <AmenityForm
        amenity={amenity}
        onSuccess={() => dispose()}
        onCloseWorkspace={() => dispose()}
      />,
      {
        title: amenity ? "Update Amenity" : "Add Amenity",
      }
    );
  };

  const actions: ColumnDef<Amenity> = {
    id: "actions",
    cell({ row }) {
      const amenity = row.original;
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
            {amenity.voided ? (
              <Menu.Item
                leftSection={<TablerIcon name="edit" size={14} />}
                onClick={() => restoreAmenity(amenity.id)}
              >
                Restore
              </Menu.Item>
            ) : (
              <>
                <Menu.Item
                  leftSection={<TablerIcon name="edit" size={14} />}
                  onClick={() => handleAddOrupdate(amenity)}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<TablerIcon name="trash" size={14} />}
                  onClick={() =>
                    confirmDelete("amenity", async () => {
                      await deleteAmenity(amenity.id);
                      mutate();
                    })
                  }
                >
                  Delete
                </Menu.Item>
              </>
            )}
          </Menu.Dropdown>
        </Menu>
      );
    },
  };
  return (
    <Stack gap={"xl"}>
      <Box>
        <DashboardPageHeader
          title="Amenities"
          subTitle={`Property Amenities`}
          icon={"tournament"}
        />
      </Box>
      <Paper bg={bgColor} p={"md"}>
        <StateFullDataTable
          {...amenitiesAsync}
          data={amenitiesAsync.amenities}
          columns={[...columns, actions]}
          onAdd={() => handleAddOrupdate()}
          withColumnViewOptions
          title="Amenities"
        />
      </Paper>
    </Stack>
  );
};

export default Amenitiespage;

const columns: ColumnDef<Amenity>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
    cell({ getValue }) {
      const icon = getValue<Amenity["icon"]>();
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
