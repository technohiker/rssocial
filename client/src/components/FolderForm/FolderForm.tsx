import { useState } from "react";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";

export function FolderForm({ onSubmission }: IFolderFormProps) {
  const required = (value: any) => {
    return value ? undefined : "Required";
  };
  const [message, setMessage] = useState("");

  const submission = async (evt: IFolderFormSubmit) => {
    let result = await onSubmission(evt.name);
    if (result) {
      setMessage(result[0]);
    } else {
      setMessage("New folder added!");
    }
  };
  return (
    <Form
      onSubmit={submission}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <p className="text-center">{message}</p>
          <FieldInput
            name="name"
            className="mb-3"
            validation={required}
            label={"Folder Name:"}
            type={"text"}
            placeholder={""}
          />
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </form>
      )}
    />
  );
}

interface IFolderFormSubmit {
  name: string;
}
interface IFolderFormProps {
  onSubmission: (name: string) => Promise<undefined | string[]>;
}
