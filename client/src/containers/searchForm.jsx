// +++++ REACT SPECIFIC/REDUX
import React, { Component } from 'react';
import { connect } from 'react-redux';

// +++++ STYLES
import { Form, Button, FormGroup } from 'react-bootstrap';
import 'react-widgets/dist/css/react-widgets.css';


// +++++ PLUGIN
import { Field, reduxForm } from 'redux-form';
import { DateTimePicker } from 'react-widgets';
import moment from 'moment';
import momentLocaliser from '../../../node_modules/react-widgets/lib/localizers/moment';
momentLocaliser(moment);

// +++++ COMPONENTS

const renderStartDatePicker = ({ input: { onChange, value }, showTime, placeholder }) => (<DateTimePicker
  onChange={onChange}
  format="DD MMM YYYY"
  time={showTime}
  min={new Date()}
  value={!value ? null : new Date(value)}
  placeholder={placeholder}
/>);

const renderEndDatePicker = ({ input: { onChange, value }, showTime, placeholder, defaultValue }) => (<DateTimePicker
  onChange={onChange}
  format="DD MMM YYYY"
  time={showTime}
  min={defaultValue}
  value={!value ? null : new Date(value)}
  placeholder={placeholder}

/>);
const setDefault = (props) => {
  if (props.search) {
    if (props.search.values) {
      return props.search.values.departDate;
    }
  }
  return new Date();
};

// this.props.form.search.values.departDate ||
class searchForm extends Component {
  render() {
  	const { handleSubmit, pristine, reset, submitting } = this.props;
    console.log('Current Search state in render', this.props.search);
    return (<div>
      <center>
        <Form inline onSubmit={handleSubmit}>

          <FormGroup>
            <div className="rw-datetimepicker rw-widget budgetSearch" >
              <Field
                className="rw-input"
                name="Budget"
                component="input"
                type="number"
                min="0"
                step="1"
                placeholder="Budget"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <div className="budgetSearch" >
              <Field
                name="departDate" showTime={false} component={renderStartDatePicker} type="text" placeholder="Start Date"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <div className="budgetSearch" >
              <Field
                defaultValue={setDefault(this.props)} name="arrivalDate" showTime={false} component={renderEndDatePicker} type="text" placeholder="End Date"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <Button bsStyle="custom" type="submit" style={{ borderRadius: '0' }}> Submit </Button>
          </FormGroup>
        </Form>
      </center>
    </div>
    );
  }
}

searchForm = reduxForm({
  form: 'search',  // a unique identifier for this form
})(searchForm);

const mapStateToProps = ({ form: { search } }) => ({
  search,
});

// (state, action,)
export default connect(mapStateToProps, null)(searchForm, renderEndDatePicker);
