import { useForm } from "react-hook-form";
import { Paper, Stack, TextField, Container } from "@mui/material";
import type { Schema } from "../types/schema";
import { schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function Users() {
  const {
    register,
    formState: { errors },
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
  });

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
        </Stack>
      </Container>
    </>
  );
}

export default Users;
