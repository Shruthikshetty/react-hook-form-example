import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Stack, TextField, Container, Button } from "@mui/material";
import type { Schema } from "../types/schema";
import RHFAutocompleteProps from "../../components/RHFAutocomplete";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import RHFCheckbox from "../../components/RHFCheckbox";
import RHFDateTimePicker from "../../components/RHFDateTimePicker";
import RHFSlider from "../../components/RHFSlider";
import RHFSWitch from "../../components/RHFSwitch";
import RHFTextField from "../../components/RHFTextField";
import React, { useEffect } from "react";
import { replace } from "lodash";

export function Users() {
  // get states data
  const statesQuery = useStates();
  const languages = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();

  const { control, unregister } = useFormContext<Schema>();

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  const isTeacher = useWatch({ control, name: "isTeacher" });
  // if isTacher is false empty the array of students
  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      // unregister the students else we will have it as undefined not good!!
      unregister("students");
    }
  }, [isTeacher, replace , unregister]);

  return (
    <>
      <Container maxWidth={"md"} style={{ padding: "1em" }}>
        <Stack sx={{ gap: 2 }}>
          <RHFTextField<Schema> name={"name"} label={"Name"} />
          <RHFTextField<Schema> name={"email"} label={"Email"} />
          <RHFAutocompleteProps<Schema>
            name={"states"}
            label="States"
            options={statesQuery.data}
          />
          <RHFToggleButtonGroup<Schema>
            name={"languageSpoken"}
            options={languages.data}
          />
          <RHFRadioGroup<Schema>
            name={"gender"}
            label="Gender"
            options={gendersQuery.data}
          />
          <RHFCheckbox<Schema>
            name={"skills"}
            label={"Skills"}
            options={skillsQuery.data ?? []}
          />
          <RHFDateTimePicker<Schema>
            name="registartionDateAndTime"
            label="Registration date"
          />
          <RHFSlider<Schema> name="salary" label={"Salary range"} />
          <RHFSWitch<Schema> name={"isTeacher"} label={"Are you a teacher"} />

          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new student
            </Button>
          )}
          {fields.map((fields, index) => (
            <React.Fragment key={fields.id}>
              <RHFTextField name={`students.${index}.name`} label="Name" />
              <Button color="error" onClick={() => remove(index)} type="button">
                Remove
              </Button>
            </React.Fragment>
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default Users;
