import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

const InputComponent = ({
  label,
  type,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <FormGroup>
    <Label for={field.name}>{label}</Label>
    <Input valid={touched[field.name] && !errors[field.name]} invalid={touched[field.name] && errors[field.name]} type={type} {...field} {...props} />
    <FormFeedback>{errors[field.name]}</FormFeedback>
  </FormGroup>
);

export default InputComponent;