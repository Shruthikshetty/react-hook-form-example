import { useFormContext } from "react-hook-form";
import { Stack, TextField, Container, ToggleButtonGroup } from "@mui/material";
import type { Schema } from "../types/schema";
import RHFAutocompleteProps from "../../components/RHFAutocomplete";
import { useGenders, useLanguages, useStates } from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";

export function Users() {
  // get states data
  const statesQuery = useStates();
  const languages = useLanguages();
  const gendersQuery = useGenders()

  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();
  return (
    <>
      <Container maxWidth={"md"} style={{ padding: "1em" }}>
        <Stack sx={{ gap: 2 }}>
          <TextField
            {...register("name")}
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register("email")}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <RHFAutocompleteProps<Schema>
            name={"states"}
            label="States"
            options={statesQuery.data}
          />
          <RHFToggleButtonGroup<Schema>
            name={"languageSpoken"}
            options={languages.data}
          />
          <RHFRadioGroup<Schema> name={"gender"} label="Gender" options={gendersQuery.data}/>
        </Stack>
      </Container>
    </>
  );
}

export default Users;
