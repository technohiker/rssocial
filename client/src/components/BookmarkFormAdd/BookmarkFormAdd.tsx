import { Field, Form } from "react-final-form";
import { useState } from "react";
import { IBookmark } from "../../types/IBookmark";

export function BookmarkFormAdd({
  onSubmission,
  bookmarkOptions,
  messageID,
  defaultValue,
}: IBookmarkFormAddProps) {
  const required = (value: any) => (value ? undefined : "Required");

  const [error, setError] = useState("");

  const submission = async (evt: IBookMarkFormSubmit) => {
    console.log({ evt });
    await onSubmission(evt.bookmark);
  };
  return (
    <Form
      onSubmit={submission}
      initialValues={{ bookmark: defaultValue }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <p className="text-center">{error}</p>
          <Field name="bookmark" validate={required} component="select">
            {bookmarkOptions.map((option) => (
              <option value={option.value}>{option.text}</option>
            ))}
          </Field>
          <button type="submit">Add Bookmark</button>
        </form>
      )}
    />
  );
}

interface IBookMarkFormSubmit {
  bookmark: number;
}

interface IBookmarkFormAddProps {
  onSubmission: (bookmark: number) => Promise<void>;
  bookmarkOptions: { value: number; text: string }[];
  messageID: number;
  defaultValue: number;
}
