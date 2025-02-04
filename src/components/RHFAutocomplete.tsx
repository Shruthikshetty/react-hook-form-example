import { Autocomplete, Box, TextField, Checkbox } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Options } from "../types/options";
import CheckBoxBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckedIcon from "@mui/icons-material/CheckBox";

type RHFAutocompleteProps<T extends FieldValues> = {
  name: Path<T>;
  options?: Options[];
  label: string;
};

export default function RHFAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
}: RHFAutocompleteProps<T>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options ?? []}
          value={value.map((id: string) =>
            options?.find((item) => item.id === id)
          )}
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option.id)?.label ?? ""
          }
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          multiple
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
            ></TextField>
          )}
          renderOption={(props, option, { selected }) => (
            <Box component="li" {...props}>
              <Checkbox
                icon={<CheckBoxBlank />}
                checkedIcon={<CheckedIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
}
