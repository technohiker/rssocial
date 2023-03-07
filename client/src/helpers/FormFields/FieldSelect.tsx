import { Field } from "react-final-form";

/** Premade field for Select type in React Final Form. */
export function FieldSelect({
  name,
  validation,
  label,
  options,
}: IFieldSelectProps) {
  return (
    <Field name={name} validate={validation} component="select">
      <label>{label}</label>
      {options.map((option) => (
        <option value={option.value}>{option.text}</option>
      ))}
    </Field>
  );
}

interface IFieldSelectProps {
  name: string;
  validation?: any | undefined;
  label: string;
  options: { value: string | number; text: string | number }[];
}
