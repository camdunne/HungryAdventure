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

const renderDateTimePicker = ({ input: { onChange, value }, showTime, placeholder }) => (<DateTimePicker
  onChange={onChange}
  format="DD MMM YYYY"
  time={showTime}
  value={!value ? null : new Date(value)}
  placeholder={placeholder}
/>);


class searchForm extends Component {
  render() {
  	const { handleSubmit, pristine, reset, submitting } = this.props;
    return (<div>
      <center>
        <Form inline onSubmit={handleSubmit}>

          <FormGroup>
            <div className="rw-datetimepicker rw-widget budgetSearch" >
              <Field className="rw-input" name="Budget" component="input" type="number" placeholder="Budget" />
            </div>
          </FormGroup>

          <FormGroup>
            <div className="budgetSearch" >
              <Field name="departDate" showTime={false} component={renderDateTimePicker} type="text" placeholder="Departure Date" />
            </div>
          </FormGroup>

          <FormGroup>
            <div className="budgetSearch" >
              <Field name="arrivalDate" showTime={false} component={renderDateTimePicker} type="text" placeholder="Arrival Date" />
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
// (state, action,)
export default connect(null, null)(searchForm);
