import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Options } from "../types/options";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Options[];
};

export function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  options,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restFeilds } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            // this newValue will always be string
            if (newValue.length) {
              onChange(newValue);
            }
          }}
          value={value.length ? value : [options?.[0].id]} // just making the button 1 as deault selected
          {...restFeilds}
        >
          {options?.map((option) => (
            <ToggleButton value={option.id} key={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    />
  );
}
