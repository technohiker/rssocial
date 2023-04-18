import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { FieldSelect } from "../../helpers/FormFields/FieldSelect";
import { IFolder } from "../../types/IFolder";

export function RSSForm({ onSubmission, folderOptions }: IRSSFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();

  const folders = [
    { value: "Pick an option", text: "Pick an option" },
    ...folderOptions,
  ];

  const [feedOption, setFeedOption] = useState("Pick an option.");

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
          {/* <FieldSelect
            name="folder"
            validation={required}
            label={"Pick a Folder:"}
            options={[
              { value: "Pick an option", text: "Pick an option" },
              ...folderOptions,
            ]}
          /> */}
          <Field name="folder" validate={required}>
            {(props) => (
              <>
                <select
                  onChange={(e) => {
                    setFeedOption(e.currentTarget.value);
                    return props.input.onChange;
                  }}
                >
                  {folders.map((folder, idx) => (
                    <option key={idx} value={folder.value}>
                      {folder.text}
                    </option>
                  ))}
                </select>
              </>
            )}
          </Field>

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
          {feedOption === "Pick an option" && (
            <>
              <FieldInput
                name="url"
                className="mb-3"
                validation={required}
                label={"This should now be showing."}
                type={"text"}
                placeholder={""}
              />
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
            </>
          )}
          {/* <label>
            Automatically retrieve new data, or schedule when call occurs?
          </label>
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
