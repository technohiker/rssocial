import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { LinkButton } from "../LinkButton/LinkButton";
import "./LoginForm.css";
import { LoadingRing } from "../LoadingRing/LoadingRing";

/** Form for logging the user in. */
export function LoginForm({ onSubmission }: ILoginFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const submission = async (evt: ILoginFormSubmit) => {
    setLoading(true);
    let result = await onSubmission(evt.username, evt.password);
    setLoading(false);
    if (result) {
      setError(result[0]);
    } else {
      history.push("/");
    }
  };

  return (
    <Card className="card-form">
      <CardTitle className="text-center">
        Please submit your username and password.
      </CardTitle>
      <CardBody>
        <Form
          onSubmit={submission}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              {isLoading ? (
                <p className="text-center">Loading...</p>
              ) : (
                <p className="text-center">{error}</p>
              )}
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
