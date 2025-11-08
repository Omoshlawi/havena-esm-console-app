import React, { FC } from "react";
import { FileUsageRule, FileUsageRuleFormData, FileUsageScope } from "../types";
import { useFileUsageRuleApi } from "../hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUsageRuleSchema } from "../utils/validation";
import { showNotification } from "@mantine/notifications";
import { handleApiErrors } from "@havena/esm-core-api";
import { Stack, TextInput, Group, Button, NumberInput } from "@mantine/core";

type Props = {
  rule?: FileUsageRule;
  onSuccess?: (rule: FileUsageRule) => void;
  onCloseWorkspace?: () => void;
  scope: FileUsageScope;
};

const FileUsageRuleForm: FC<Props> = ({
  rule,
  onCloseWorkspace,
  onSuccess,
  scope,
}) => {
  const { addFileUsageRule, updateFileUsageRule, mutate } =
    useFileUsageRuleApi();
  const form = useForm<FileUsageRuleFormData>({
    defaultValues: {
      scopeId: rule?.scopeId ?? scope.id,
      maxFiles: rule?.maxFiles ?? 1,
    },
    resolver: zodResolver(FileUsageRuleSchema),
  });

  const onSubmit: SubmitHandler<FileUsageRuleFormData> = async (data) => {
    try {
      const res = rule
        ? await updateFileUsageRule(rule?.id, data)
        : await addFileUsageRule(data);
      onSuccess?.(res);
      onCloseWorkspace?.();
      mutate();
      showNotification({
        title: "succes",
        message: `Rule ${rule ? "updated" : "created"} succesfull`,
        color: "teal",
      });
    } catch (error) {
      const e = handleApiErrors<FileUsageRuleFormData>(error);
      if (e.detail) {
        showNotification({ title: "error", message: e.detail, color: "red" });
      } else
        Object.entries(e).forEach(([key, val]) =>
          form.setError(key as keyof FileUsageRuleFormData, { message: val })
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
            name="maxFiles"
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                label="Maximu files"
                error={fieldState.error?.message}
                placeholder="Maximum allowed file uploads"
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

export default FileUsageRuleForm;
