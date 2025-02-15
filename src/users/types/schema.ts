// schema for form using zod
import { z } from "zod";
import { patters } from "../../constants";

// refine is used to give custom validations
export const schema = z
  .intersection(
    z.object({
      name: z.string().min(1, { message: "Required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine(
          (text) => {
            // validate the user entered text to be a valied email
            return patters.email.test(text);
          },
          { message: "Email not valied" }
        ),
      states: z
        .array(z.string())
        .min(1)
        .max(2, { message: "can only select 2 states" }),
      languageSpoken: z.array(z.string()),
      gender: z.string().min(1), // is required
      skills: z
        .array(z.string())
        .max(2, { message: "only 2 skills can be selected" }),
      registrationDateAndTime: z.date(),
      salary: z.array(z.number()).min(2).max(2),
    }),
    z.discriminatedUnion("varient", [
      z.object({ varient: z.literal("create") }),
      z.object({ varient: z.literal("edit"), id: z.number() }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4),
          })
        ),
      }),
    ])
  );

// get the type of our schema :) so now we have type safty for our form
export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  varient: "create",
  name: "",
  email: "",
  states: [],
  languageSpoken: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  salary: [0, 2000],
  isTeacher: false,
};
