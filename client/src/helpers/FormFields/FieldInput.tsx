import { Field } from "react-final-form";
/** Premade field for Input type in React Final Form. */
export function FieldInput({
  name,
  className,
  validation,
  label,
  type,
  placeholder,
  value,
}: IFieldInputProps) {
  return (
    <Field name={name} validate={validation} component="input" value={value}>
      {({ input, meta }) => (
        <div className={className}>
          <label className="form-label">
            {label}
            <input
              {...input}
              type={type}
              placeholder={placeholder}
              className="form-control"
            />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </label>
        </div>
      )}
    </Field>
  );
}

interface IFieldInputProps {
  name: string;
  className?: string;
  validation?: any | undefined;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: any;
}
