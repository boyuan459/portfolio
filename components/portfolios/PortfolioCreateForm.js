import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Label, Button, Alert } from 'reactstrap';
import Input from '../form/Input'
import Date from '../form/Date'

const validateInputs = values => {
  let errors = {};

  Object.entries(values).forEach(([key,value]) => {
    
    if (!values[key] && key !== 'endDate') {
      errors[key] = `Field ${key} is required!`
    }
  })

  const startDate = values.startDate
  const endDate = values.endDate

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = 'End date connot be before start date!'
  }

  return errors;
}

class PortfolioCreateForm extends React.Component {
  state = {
    name: ""
  };

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    const { onSubmit, error, initialValues } = this.props

    return (
      <div>
        {error && <Alert color="danger">{error}</Alert>}
        <Formik
          initialValues={initialValues}
          validate={validateInputs}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="title" label="Title" component={Input} />
              <Field type="text" name="company" label="Company" component={Input} />
              <Field type="text" name="location" label="Location" component={Input} />
              <Field type="text" name="position" label="Position" component={Input} />
              <Field type="textarea" name="description" label="Description" component={Input} />
              <Field initialDate={initialValues.startDate} name="startDate" label="Start Date" component={Date} />
              <Field initialDate={initialValues.endDate} name="endDate" label="End Date" component={Date} />
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default PortfolioCreateForm;
