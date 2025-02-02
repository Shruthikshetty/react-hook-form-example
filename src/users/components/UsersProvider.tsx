import { FormProvider, useForm } from "react-hook-form";
import Users from "./Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { defaultValues, Schema, schema } from "../types/schema";

export function UsersProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <Users />
      {/* purely for development purposes */}
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
