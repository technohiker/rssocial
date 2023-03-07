import { Field, FieldInputProps } from "react-final-form";
import { Card, CardBody } from "reactstrap";

/** Premade field for Input type in React Final Form. */
export function FieldInput({
  name,
  className,
  validation,
  label,
  type,
  placeholder,
}: IFieldInputProps) {
  return (
    <Field name={name} validate={validation} component="input">
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
}
