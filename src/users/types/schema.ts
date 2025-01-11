// schema for form using zod
import { custom, z } from "zod";
import { patters } from "../../constants";

// refine is used to give custom validations
export const schems = z.object({
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
