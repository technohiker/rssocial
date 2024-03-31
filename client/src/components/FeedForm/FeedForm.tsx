import { useState } from "react";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { FieldSelect } from "../../helpers/FormFields/FieldSelect";
import { IFolder } from "../../types/IFolder";
import { ISource } from "../../types/ISource";
import { Conditional } from "../../helpers/FormFields/FieldCondition";

/** Create a news feed for the user. */
export function FeedForm({ onSubmission, folders, sources }: IRSSFormProps) {
  console.log({ folders });
  console.log({ sources });
  const required = (value: any) => {
    return value ? undefined : "Required";
  };
  const [message, setMessage] = useState("");

  const submission = async (evt: IRSSFormSubmit) => {
    console.log({ evt });
    if (
      (evt.source === "rss" && !evt.url) ||
      (evt.source === "reddit" && !evt.subreddit)
    ) {
      setMessage("Please fill out the whole form.");
      return;
    }
    let result = await onSubmission(evt);
    if (result) {
      setMessage(result[0]);
    } else {
      setMessage("New feed generated!");
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
            <p className="text-center">{message}</p>
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
                placeholder={"http://feedpress.me/hacker-news-best"}
              />
            </Conditional>

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
