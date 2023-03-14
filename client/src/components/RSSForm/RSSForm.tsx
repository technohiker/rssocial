import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";

export function RSSForm({ onSubmission }: IRSSFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();

  const submission = async (evt: IRSSFormSubmit) => {
    let result = await onSubmission(evt);
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
            name="name"
            className="mb-3"
            validation={required}
            label={"Feed Name:"}
            type={"text"}
            placeholder={""}
          />
          <FieldInput
            name="url"
            className="mb-3"
            validation={required}
            label={"RSS URL:"}
            type={"text"}
            placeholder={""}
          />
          <label>
            Automatically retrieve new data, or schedule when call occurs?
          </label>
          <FieldInput
            name="frequency"
            className="mb-3"
            validation={required}
            label={"Auto:"}
            type={"radio"}
            value="auto"
          />
          <FieldInput
            name="frequency"
            className="mb-3"
            validation={required}
            label={"Schedule:"}
            type={"radio"}
            value="schedule"
          />

          <FieldInput name="frequencyField" label="Frequency:" type="number" />
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      )}
    />
  );
}

interface IRSSFormSubmit {
  username: string;
  password: string;
  email: string;
}
interface IRSSFormProps {
  onSubmission: (...args: IRSSFormSubmit[]) => Promise<undefined | string[]>;
}
