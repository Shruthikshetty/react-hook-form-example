import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label" | "disabled">;

export default function RHFTextField<T extends FieldValues>({
  name,
  ...TextFeildProps
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...TextFeildProps}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
