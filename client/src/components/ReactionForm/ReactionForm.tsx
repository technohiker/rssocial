import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-final-form";
import { FieldInput } from "../../helpers/FormFields/FieldInput";
import { FieldSelect } from "../../helpers/FormFields/FieldSelect";

export function RSSForm({ onSubmission, folderOptions }: IReactionFormProps) {
  const required = (value: any) => (value ? undefined : "Required");
  const [error, setError] = useState("");
  const history = useHistory();

  const submission = async (evt: IReactionFormSubmit) => {
    let result = await onSubmission(evt.url);
    if (result) {
      setError(result[0]);
    } else {
      history.push("/");
    }
  };
  return (
    // Include default reaction, the current reaction, and means to call reaction.
    <Form
      onSubmit={submission}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <p className="text-center">{error}</p>
          <FieldSelect
            name="reaction"
            validation={required}
            label={"Reaction:"}
            options={folderOptions}
          />
        </form>
      )}
    />
  );
}

interface IReactionFormSubmit {
  url: string;
}
interface IReactionFormProps {
  onSubmission: (url: string) => Promise<undefined | string[]>;
  folderOptions: { reactID: number; text: string }[];
}
