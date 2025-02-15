import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Stack,
  Container,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { defaultValues, type Schema } from "../types/schema";
import RHFAutocompleteProps from "../../components/RHFAutocomplete";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../services/queries";
import { RHFToggleButtonGroup } from "../../components/RHFToggleButtonGroup";
import { RHFRadioGroup } from "../../components/RHFRadioGroup";
import RHFCheckbox from "../../components/RHFCheckbox";
import RHFDateTimePicker from "../../components/RHFDateTimePicker";
import RHFSlider from "../../components/RHFSlider";
import RHFSWitch from "../../components/RHFSwitch";
import RHFTextField from "../../components/RHFTextField";
import React, { useEffect } from "react";
import styles from "./User.module.css";
import { useCreateUser } from "../services/mutations";

export function Users() {
  // get states data
  const statesQuery = useStates();
  const languages = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();
  const createUserMutation = useCreateUser();

  const { control, unregister, reset, setValue, handleSubmit } =
    useFormContext<Schema>();

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  // seleted suer id
  const id = useWatch({ control, name: "id" });
  const varient = useWatch({ control, name: "varient" });
  // get the user details
  const userQuery = useUser(id);

  const isTeacher = useWatch({ control, name: "isTeacher" });
  // if isTacher is false empty the array of students
  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      // unregister the students else we will have it as undefined not good!!
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  // reset the data if user is seleted
  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  // reset form to default values
  function handlereset() {
    reset(defaultValues);
  }

  function handleUserclick(id: number) {
    setValue("id", id); // set value of your id in form state
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (varient === "create") {
      createUserMutation.mutate(data);
    } else {
      // edit the selected user
    }
  };

  return (
    <>
      <Container
        maxWidth={"md"}
        component={"form"}
        style={{ padding: "1em" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <List subheader={<ListSubheader>Users</ListSubheader>}>
            {usersQuery?.data?.map((user) => (
              <ListItem key={user.id}>
                <ListItemButton
                  onClick={() => handleUserclick(user.id)}
                  selected={user.id === id}
                >
                  <ListItemText primary={user.label}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Stack sx={{ gap: 2, flex: 1 }}>
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
              name="registrationDateAndTime"
              label="Registration date"
            />
            <RHFSlider<Schema> name="salary" label={"Salary range"} />
            <RHFSWitch<Schema> name={"isTeacher"} label={"Are you a teacher"} />

            {isTeacher && (
              <Button
                variant="contained"
                className={styles.centered}
                onClick={() => append({ name: "" })}
                type="button"
              >
                Add new student
              </Button>
            )}
            {fields.map((fields, index) => (
              <React.Fragment key={fields.id}>
                <RHFTextField name={`students.${index}.name`} label="Name" />
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => remove(index)}
                  type="button"
                  className={styles.centered}
                >
                  Remove
                </Button>
              </React.Fragment>
            ))}
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button type="submit" variant="contained">
                New User
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                onClick={handlereset}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default Users;
