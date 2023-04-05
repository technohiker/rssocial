import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { FieldSelect } from "../../helpers/FormFields/FieldSelect";
import { IFolder } from "../../types/IFolder";

export function RSSForm({ onSubmission, folderOptions }: IRSSFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();

  const submission = async (evt: IRSSFormSubmit) => {
    let result = await onSubmission(evt.url);
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
          <FieldSelect
            name="folder"
            validation={required}
            label={"Pick a Folder:"}
            options={folderOptions}
          />
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
          {/* <label>
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

      <FieldInput name="frequencyField" label="Frequency:" type="number" /> */}
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      )}
    />
  );
}

interface IRSSFormSubmit {
  url: string;
}
interface IRSSFormProps {
  onSubmission: (url: string) => Promise<undefined | string[]>;
  folderOptions: { value: string; text: string }[];
}
