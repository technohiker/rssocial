import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";

export function FolderForm({ onSubmission }: IFolderFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();

  const submission = async (evt: IFolderFormSubmit) => {
    let result = await onSubmission(evt.name);
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
