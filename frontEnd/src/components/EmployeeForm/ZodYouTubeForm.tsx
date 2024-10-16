import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  channel: z.string().nonempty("Channel is required"),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const ZodYouTubeForm = () => {
  const form = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });
  console.log("Form State", form);
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitSuccessful } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      alert("Form Submitted Successfully");
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button>Submit</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default ZodYouTubeForm;
