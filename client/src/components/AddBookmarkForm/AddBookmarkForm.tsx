import { useState } from "react";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { Button } from "reactstrap";

/** Creates a new Bookmark object for the user. */
export function AddBookmarkForm({ onSubmission }: IBookmarkFormProps) {
  const required = (value: any) => {
    return value ? undefined : "Required";
  };
  const [message, setMessage] = useState("");

  const submission = async (evt: IBookmarkFormSubmit) => {
    let result = await onSubmission(evt.name);
    if (result) {
      setMessage(result[0]);
    } else {
      setMessage("New bookmark added!");
    }
  };
  return (
    <Form
      onSubmit={submission}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <p className="text-center">{message}</p>
            <FieldInput
              name="name"
              className="mb-3"
              validation={required}
              label={"Bookmark Name:"}
              type={"text"}
              placeholder={""}
            />
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </div>
        </form>
      )}
    />
  );
}

interface IBookmarkFormSubmit {
  name: string;
}
interface IBookmarkFormProps {
  onSubmission: (name: string) => Promise<undefined | string[]>;
}
