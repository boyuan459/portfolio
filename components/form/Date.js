import React from "react";
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Label, FormFeedback } from 'reactstrap'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { setFieldValue, setFieldTouched } = this.props.form
    const { name } = this.props.field
    const { dateValue } = this.state

    setFieldValue(name, dateValue, true)
    setFieldTouched(name, true, true)
  }

  handleChange(date) {
    const { setFieldValue, setFieldTouched } = this.props.form
    const { name } = this.props.field
    
    this.setState({
      dateValue: date
    });

    setFieldValue(name, date, true)
    setFieldTouched(name, true, true)
  }

  render() {
    const { label, field, form: { touched, errors }, disabled = false } = this.props
    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          {
            disabled ? 
            'Still working here'
            : (
              <DatePicker
                selected={this.state.dateValue}
                onChange={this.handleChange}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                maxDate={moment()}
                dropdownMode="select"
              />
            )
          }
        </div>
        {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </FormGroup>
    );
  }
}