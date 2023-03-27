import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";

export function RegisterForm({ onSubmission }: IRegisterFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();

  const submission = async (evt: IRegisterFormSubmit) => {
    console.log("Handling submission.");
    let result = await onSubmission(evt.username, evt.password, evt.email);
    if (result) {
      setError(result[0]);
    } else {
      history.push("/");
    }
  };
  return (
    <Form
      onSubmit={submission}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <p className="text-center">{error}</p>
          <FieldInput
            name="username"
            className="mb-3"
            validation={required}
            label={"Username:"}
            type={"text"}
            placeholder={""}
          />
          <FieldInput
            name="password"
            className="mb-3"
            validation={required}
            label={"Password:"}
            type={"password"}
            placeholder={""}
          />
          <FieldInput
            name="email"
            className="mb-3"
            validation={required}
            label={"Email Address:"}
            type={"email"}
            placeholder={""}
          />
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      )}
    />
  );
}

interface IRegisterFormSubmit {
  username: string;
  password: string;
  email: string;
}
interface IRegisterFormProps {
  onSubmission: (
    username: string,
    password: string,
    email: string
  ) => Promise<undefined | string[]>;
}
