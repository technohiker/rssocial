import { Field, Form } from "react-final-form";
import { useState } from "react";
import { Button } from "reactstrap";

export function NotesForm({ onSubmission, defaultNote }: INotesForm) {
  const required = (value: any) => (value ? undefined : "Required");

  const submission = async (evt: INotesFormSubmit) => {
    const res = await onSubmission(evt.notes);
  };

  const [error, setError] = useState("");

  return (
    <Form
      onSubmit={submission}
      initialValues={defaultNote}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <p className="text-center">{error}</p>
          <Field name="notes" validate={required} component="textarea">
            {defaultNote}
          </Field>
          <Button type="submit">Add Notes</Button>
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
