import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { LinkButton } from "../LinkButton/LinkButton";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

export function RegisterForm({ onSubmission }: IRegisterFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();

  const submission = async (evt: IRegisterFormSubmit) => {
    let result = await onSubmission(evt.username, evt.password, evt.email);
    if (result) {
      setError(result[0]);
    } else {
      history.push("/");
    }
  };
  return (
    <Card className="card-form">
      <CardTitle className="text-center">Create a new account.</CardTitle>
      <CardBody>
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
              <div className="d-flex justify-content-evenly">
                <Button type="submit" disabled={submitting}>
                  Submit
                </Button>
                <LinkButton link="/" className="btn-danger" text="Cancel" />
              </div>
            </form>
          )}
        />
      </CardBody>
    </Card>
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
