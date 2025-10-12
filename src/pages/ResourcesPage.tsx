import { DashboardPageHeader, TablerIcon } from "@hive/esm-core-components";
import {
  Box,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  ThemeIcon,
  Title,
  useComputedColorScheme,
  useMantineTheme,
  Text,
  Badge,
  rem,
  Transition,
} from "@mantine/core";
import React from "react";
import { useResources } from "../hooks";

const ResourcesPage = () => {
  const resources = useResources();
  const colorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  const bgColor =
    colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6];
  const cardColor =
    colorScheme === "light" ? theme.white : theme.colors.dark[7];
  const title = "Resources";

  return (
    <Stack gap="xl">
      <Box>
        <DashboardPageHeader
          title={title}
          subTitle="Manage and monitor your data resources"
          icon="shieldCheck"
        />
      </Box>

      <Paper
        bg={bgColor}
        p="xl"
        radius="md"
        style={{
          border: `1px solid ${
            isDark ? theme.colors.dark[5] : theme.colors.gray[2]
          }`,
        }}
      >
        <Stack gap="xl">
          <Group justify="space-between" align="center">
            <Box>
              <Title order={3} fw={600} mb={4}>
                App Resources
              </Title>
              <Text size="sm" c="dimmed">
                {resources.length}{" "}
                {resources.length === 1 ? "resource" : "resources"} available
              </Text>
            </Box>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
            {resources.map((resource, i) => (
              <Transition
                key={i}
                mounted={true}
                transition="fade-up"
                duration={300}
                timingFunction="ease"
              >
                {(styles) => (
                  <Card
                    bg={cardColor}
                    p="lg"
                    radius="md"
                    style={{
                      ...styles,
                      border: `1px solid ${
                        isDark ? theme.colors.dark[4] : theme.colors.gray[2]
                      }`,
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = isDark
                        ? "0 8px 24px rgba(0, 0, 0, 0.4)"
                        : "0 8px 24px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    <Stack gap="md">
                      <Group gap="md" wrap="nowrap">
                        <ThemeIcon
                          variant="gradient"
                          gradient={{ from: "blue", to: "cyan", deg: 135 }}
                          size={rem(54)}
                          radius="md"
                        >
                          <TablerIcon name="database" size={28} />
                        </ThemeIcon>

                        <Box style={{ flex: 1, minWidth: 0 }}>
                          <Text
                            fw={600}
                            size="sm"
                            mb={2}
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {resource.resource}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {resource?.actions?.length || 0} actions
                          </Text>
                        </Box>
                      </Group>

                      {resource?.actions && resource.actions.length > 0 && (
                        <Group gap={6}>
                          {resource.actions.map((action, actionIndex) => (
                            <Badge
                              key={actionIndex}
                              variant="light"
                              color="blue"
                              size="sm"
                              radius="sm"
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {action}
                            </Badge>
                          ))}
                        </Group>
                      )}
                    </Stack>
                  </Card>
                )}
              </Transition>
            ))}
          </SimpleGrid>

          {resources.length === 0 && (
            <Paper
              p="xl"
              radius="md"
              style={{
                border: `2px dashed ${
                  isDark ? theme.colors.dark[4] : theme.colors.gray[3]
                }`,
                textAlign: "center",
              }}
            >
              <Stack align="center" gap="md">
                <ThemeIcon
                  size={rem(64)}
                  radius="xl"
                  variant="light"
                  color="gray"
                >
                  <TablerIcon name="database" size={32} />
                </ThemeIcon>
                <Box>
                  <Text fw={500} size="lg" mb={4}>
                    No resources found
                  </Text>
                  <Text size="sm" c="dimmed">
                    Resources will appear here once they are configured
                  </Text>
                </Box>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ResourcesPage;
