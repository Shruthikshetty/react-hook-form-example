import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Options } from "../types/options";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: Options[];
};

export default function RHFCheckbox<T extends FieldValues>({
  name,
  label,
  options,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={value.includes(option.id)}
                    key={option.id}
                    onChange={() => {
                      if (value.includes(option.id)) {
                        onChange(
                          value.filter((item: string) => item !== option.id)
                        );
                      } else {
                        onChange([...value, option.id]);
                      }
                    }}
                  />
                }
                label={option.label}
              ></FormControlLabel>
            ))}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
