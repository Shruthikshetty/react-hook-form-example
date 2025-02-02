import { useFormContext } from "react-hook-form";
import {
  Stack,
  TextField,
  Container,
} from "@mui/material";
import type { Schema } from "../types/schema";
import RHFAutocompleteProps from "../../components/RHFAutocomplete";

const STATES = [
  { id: "1", label: "Texas" },
  { id: "2", label: "California" },
  { id: "3", label: "New York" },
  { id: "4", label: "Florida" },
  { id: "5", label: "Illinois" },
  { id: "6", label: "Pennsylvania" },
  { id: "7", label: "Ohio" },
  { id: "8", label: "Georgia" },
  { id: "9", label: "North Carolina" },
  { id: "1", label: "Michigan" },
];

export function Users() {
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
            options={STATES}
          />
        </Stack>
      </Container>
    </>
  );
}

export default Users;
