import { Field, Form } from "react-final-form";
import { useState } from "react";
import { Button } from "reactstrap";

/** Text form that lets user set notes on a message. */
export function NotesForm({ onSubmission, defaultNote }: INotesForm) {
  const required = (value: any) => (value ? undefined : "Required");

  const submission = async (evt: INotesFormSubmit) => {
    const res = await onSubmission(evt.notes);
  };

  const [error, setError] = useState("");

  return (
    <Form
      onSubmit={submission}
      initialValues={{ notes: defaultNote }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <p className="text-center">{error}</p>
            <Field name="notes" validate={required} component="textarea" />
            <Button type="submit">Save Note</Button>
          </div>
        </form>
      )}
    />
  );
}

interface INotesFormSubmit {
  notes: string;
}
interface INotesForm {
  onSubmission: (notes: string) => Promise<void>;
  defaultNote: string;
}
