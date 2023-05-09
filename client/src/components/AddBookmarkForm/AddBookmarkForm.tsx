import { useState } from "react";
import { Field, Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { Button } from "reactstrap";

export function AddBookmarkForm({ onSubmission }: IBookmarkFormProps) {
  const required = (value: any) => {
    return value ? undefined : "Required";
  };
  const [error, setError] = useState("");

  const submission = async (evt: IBookmarkFormSubmit) => {
    console.log("Fired!");
    let result = await onSubmission(evt.name);
    if (result) {
      setError(result[0]);
    } else {
      setError("New bookmark added!");
    }
  };
  return (
    <Form
      onSubmit={submission}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <p className="text-center">{error}</p>
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
