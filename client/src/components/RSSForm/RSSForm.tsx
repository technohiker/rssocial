import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { FieldSelect } from "../../helpers/FormFields/FieldSelect";
import { IFolder } from "../../types/IFolder";
import { ISource } from "../../types/ISource";
import { Conditional } from "../../helpers/FormFields/FieldCondition";

export function RSSForm({ onSubmission, folders, sources }: IRSSFormProps) {
  const required = (value: any) => {
    return value ? undefined : "Required";
  };
  const [error, setError] = useState("");
  const history = useHistory();

  // let folders = [];

  // if (folderOptions.length === 0) {
  //   folders.push();
  // }

  const submission = async (evt: IRSSFormSubmit) => {
    console.log({ evt });
    let result = await onSubmission(evt);
    if (result) {
      setError(result[0]);
    } else {
      history.push("/");
    }
  };
  return (
    <Form
      initialValues={{
        folder: folders[0].id,
        source: sources[0].name,
      }}
      onSubmit={submission}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <p className="text-center">{error}</p>
          <FieldSelect
            name="folder"
            validation={required}
            label={"Pick a Folder:"}
            options={[
              ...folders.map((folder) => {
                return {
                  value: folder.id,
                  text: folder.name,
                };
              }),
            ]}
          />

          {/* <Field name="source" validate={required}>
            {(props) => (
              <div className="mb-3">
                <label className="form-label">Feed Type: </label>
                <select
                  {...props.input}
                  className="form-control"
                  onChange={(e) => {
                    setSelectedSource(e.currentTarget.value);
                    return props.input.onChange;
                  }}
                >
                  {sources.map((source) => (
                    <option {...props.input} key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </Field> */}

          <FieldSelect
            name="source"
            validation={required}
            label={"Pick a Source:"}
            options={sources.map((source) => {
              return { value: source.name, text: source.name };
            })}
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
          {/* <Conditional when="source" is="RSS Feed">
            <FieldInput
              name="frequency"
              className="mb-3"
              validation={required}
              label={"Auto:"}
              type={"text"}
              value="auto"
            />
          </Conditional> */}
          {/* {selectedSource === "Pick an option" && (
            <>
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
          )} */}
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

export interface IRSSFormSubmit {
  folder: string;
  source: string;
  name: string;
  url: string;
  twt_hashtag?: string;
  twt_list?: string;
  twt_searchTerm?: string;
  twt_user?: string;
}
interface IRSSFormProps {
  onSubmission: (evt: IRSSFormSubmit) => Promise<undefined | string[]>;
  folders: IFolder[];
  sources: ISource[];
}
