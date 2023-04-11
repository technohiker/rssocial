import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { FieldSelect } from "../../helpers/FormFields/FieldSelect";

export function ReactionForm({
  onSubmission,
  reactOptions,
  messageID,
  defaultValue,
}: IReactionFormProps) {
  const required = (value: any) => (value ? undefined : "Required");

  const [error, setError] = useState("");

  const submission = async (evt: IReactionFormSubmit) => {
    console.log({ evt });
    await onSubmission(evt.reaction, messageID);
  };
  return (
    // Include default reaction, the current reaction, and means to call reaction.
    <Form
      onSubmit={submission}
      initialValues={{ reaction: defaultValue }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <p className="text-center">{error}</p>
          <Field name="reaction" validate={required} component="select">
            {reactOptions.map((option) => (
              <option value={option.value}>{option.text}</option>
            ))}
          </Field>
          <button type="submit">React</button>
        </form>
      )}
    />
  );
}

interface IReactionFormSubmit {
  reaction: number;
}
interface IReactionFormProps {
  onSubmission: (reactID: number, messageID: number) => Promise<void>;
  reactOptions: { value: number; text: string }[];
  messageID: number;
  defaultValue: number;
}
