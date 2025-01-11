import { useForm } from "react-hook-form";

export function Users() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<{ email: string }>({mode:"all"});

  const formSubmit = () =>{
    console.log("submit");
  }

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      {/* Instead of making it all controlled, the hook form manages this for us 
      and has access to all the props of this input field below */}
      <input
        {...register("email", {
          required: {
            value: true,
            message: "The email is required",
          },
          maxLength: {
            value: 10,
            message: "max length can only be 10",
          },
        })}
        placeholder="email"
      />
      <p>{errors.email?.message}</p>
    </form>
  );
}

export default Users;
