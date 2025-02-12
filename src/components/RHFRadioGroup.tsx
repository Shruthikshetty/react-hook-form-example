import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Options } from "../types/options";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Options[];
  label: string;
};

export function RHFRadioGroup<T extends FieldValues>({
  name,
  label,
  options,
}: Props<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => (
              <FormControlLabel
                label={option.label}
                key={option.id}
                value={option.id}
                control={<Radio checked={field.value === option.id} />}
              ></FormControlLabel>
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
}
