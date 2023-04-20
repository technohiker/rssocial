import { Field, FieldProps, FieldInputProps } from "react-final-form";

/** Premade field for Select type in React Final Form. */
export function FieldSelect({
  name,
  validation,
  label,
  options,
}: IFieldSelectProps) {
  return (
    <div className="mb-3">
      <label className="form-label">
        {label}
        <Field name={name} validate={validation} component="select">
          {options.map((option) => (
            <option value={option.value}>{option.text}</option>
          ))}
        </Field>
      </label>
    </div>
  );
}

interface IFieldSelectProps {
  name: string;
  validation?: any | undefined;
  label: string;
  options: { value: string | number; text: string | number }[];
}
