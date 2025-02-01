// schema for form using zod
import { z } from "zod";
import { patters } from "../../constants";

// refine is used to give custom validations
export const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .refine(
      (text) => {
        // validate the user entered text to be a valied email
        return patters.email.test(text);
      },
      { message: "Email not valied" }
    ),
});

// get the type of our schema :) so now we have type safty for our form
export type Schema = z.infer<typeof schema>;
