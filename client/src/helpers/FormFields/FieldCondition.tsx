import { Field } from "react-final-form";

/** Renders field only when another field's input matches a certain value.
 * Code taken from https://codesandbox.io/s/lm4p3m92q and converted into TypeScript.
 */
export const Conditional = ({ when, is, children }: IConditional) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

interface IConditional {
  when: any;
  is: any;
  children: any;
}
