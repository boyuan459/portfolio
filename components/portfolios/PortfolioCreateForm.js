import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Label, Button } from 'reactstrap';
import Input from '../form/Input'
import Date from '../form/Date'

const validateInputs = values => {
  let errors = {};

  Object.entries(values).forEach(([key,value]) => {
    if (!values[key]) {
      errors[key] = `Field ${key} is required!`
    }
  })

  return errors;
}

const INITIAL_VALUES = {
  title: '',
  company: '',
  location: '',
  position: '',
  description: '',
  startDate: '',
  endDate: ''
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
    return (
      <div>
        <Formik
          initialValues={INITIAL_VALUES}
          validate={validateInputs}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="title" label="Title" component={Input} />
              <Field type="text" name="company" label="Company" component={Input} />
              <Field type="text" name="location" label="Location" component={Input} />
              <Field type="text" name="position" label="Position" component={Input} />
              <Field type="textarea" name="description" label="Description" component={Input} />
              <Field name="startDate" label="Start Date" component={Date} />
              <Field name="endDate" label="End Date" component={Date} />
              <Button type="submit" disabled={isSubmitting}>
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
