import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";

/** Form for logging the user in. */
export function LoginForm({ onSubmission }: ILoginFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();

  const submission = async (evt: ILoginFormSubmit) => {
    let result = await onSubmission(evt.username, evt.password);
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
              <button type="submit" disabled={submitting}>
                Submit
              </button>
            </form>
          )}
        />
  );
}

interface ILoginFormSubmit {
  username: string;
  password: string;
}

interface ILoginFormProps {
  onSubmission: (
    username: string,
    password: string
  ) => Promise<undefined | string[]>;
}