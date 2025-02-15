import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { Slider, Typography } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export default function RHFSlider<T extends FieldValues>({
  name,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Typography color="blue">{field.value[0]}K - {field.value[1]}K</Typography>
          <Slider {...field} valueLabelDisplay="auto"/>
        </>
      )}
    />
  );
}
