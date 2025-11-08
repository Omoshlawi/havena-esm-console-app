import React, { FC } from "react";
import { FileUsageScope, FileUsageScopeFormData } from "../types";
import { useFileUsageScopeApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUsageScopeSchema } from "../utils/validation";
import { showNotification } from "@mantine/notifications";
import { handleApiErrors } from "@havena/esm-core-api";
import { Stack, TextInput, Group, Button, Textarea } from "@mantine/core";
type Props = {
  scope?: FileUsageScope;
  onSuccess?: (scope: FileUsageScope) => void;
  onCloseWorkspace?: () => void;
};
const FileusageScopeForm: FC<Props> = ({
  onCloseWorkspace,
  onSuccess,
  scope,
}) => {
  const { addFileUsageScope, updateFileUsageScope, mutate } =
    useFileUsageScopeApi();
  const form = useForm<FileUsageScopeFormData>({
    defaultValues: {
      modelName: scope?.modelName ?? "",
      description: scope?.description ?? "",
      purpose: scope?.purpose ?? "",
    },
    resolver: zodResolver(FileUsageScopeSchema),
  });

  const onSubmit: SubmitHandler<FileUsageScopeFormData> = async (data) => {
    try {
      const res = scope
        ? await updateFileUsageScope(scope?.id, data)
        : await addFileUsageScope(data);
      onSuccess?.(res);
      onCloseWorkspace?.();
      mutate();
      showNotification({
        title: "succes",
        message: `File usage scope ${scope ? "updated" : "created"} succesfull`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<FileUsageScopeFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof FileUsageScopeFormData, { message: val })
        );
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack p={"md"} h={"100%"} justify="space-between">
        <Stack gap={"md"}>
          <Controller
            control={form.control}
            name="modelName"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Model"
                error={fieldState.error?.message}
                placeholder="Model name"
              />
            )}
          />
          <Controller
            control={form.control}
            name="purpose"
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Purpose"
                error={fieldState.error?.message}
                placeholder="purpose of the file"
              />
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                label="Description"
                error={fieldState.error?.message}
                placeholder="Describe ..."
              />
            )}
          />
        </Stack>
        <Group gap={1}>
          <Button
            flex={1}
            variant="default"
            radius={0}
            onClick={onCloseWorkspace}
          >
            Cancel
          </Button>
          <Button
            radius={0}
            flex={1}
            fullWidth
            type="submit"
            variant="filled"
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default FileusageScopeForm;
