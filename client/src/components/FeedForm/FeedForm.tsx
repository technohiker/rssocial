import { useState } from "react";
import { Field, Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { FieldSelect } from "../../helpers/FormFields/FieldSelect";
import { IFolder } from "../../types/IFolder";
import { ISource } from "../../types/ISource";
import { Conditional } from "../../helpers/FormFields/FieldCondition";

export function FeedForm({ onSubmission, folders, sources }: IRSSFormProps) {
  console.log({ folders });
  console.log({ sources });
  const required = (value: any) => {
    return value ? undefined : "Required";
  };
  const [error, setError] = useState("");

  const submission = async (evt: IRSSFormSubmit) => {
    console.log({ evt });
    if (
      (evt.source === "rss" && !evt.url) ||
      (evt.source === "reddit" && !evt.subreddit)
    ) {
      setError("Please fill out the whole form.");
      return;
    }
    let result = await onSubmission(evt);
    if (result) {
      setError(result[0]);
    } else {
      setError("New feed generated!");
    }
  };
  if (folders.length === 0)
    return <p>Please add a folder before you try adding a feed!</p>;
  else if (sources.length === 0)
    return (
      <p>
        No potential sources(RSS, Twitter) found! Please contact the developer.
      </p>
    );
  else
    return (
      <Form
        initialValues={{
          folder: folders[0].id,
          source: sources[0].name,
          sort: "hot",
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
            <Conditional when="source" is="rss">
              <FieldInput
                name="url"
                className="mb-3"
                label={"RSS URL:"}
                type={"text"}
                placeholder={"https://lifehacker.com/rss"}
              />
            </Conditional>

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
            <Conditional when="source" is="reddit">
              <FieldInput
                name="subreddit"
                className="mb-3"
                label="Subreddit:"
                type="text"
                placeholder="news,jokes,nba..."
              />
            </Conditional>
            <Conditional when="source" is={"reddit"}>
              <FieldSelect
                name="sort"
                label="Sort:"
                options={[
                  { value: "hot", text: "Hot" },
                  { value: "new", text: "New" },
                  { value: "top", text: "Top" },
                  { value: "rising", text: "Rising" },
                  { value: "controversial", text: "Controversial" },
                ]}
              />
            </Conditional>
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
  url?: string;
  twt_hashtag?: string;
  twt_list?: string;
  twt_searchTerm?: string;
  twt_user?: string;
  subreddit?: string;
  sort?: string;
}
interface IRSSFormProps {
  onSubmission: (evt: IRSSFormSubmit) => Promise<undefined | string[]>;
  folders: IFolder[];
  sources: ISource[];
}
