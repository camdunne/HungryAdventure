// +++++ REACT SPECIFIC/REDUX
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const renderStartDatePicker = ({
  input: { onChange, value },
  showTime,
  placeholder }) => (
    <DateTimePicker
      onChange={onChange}
      format="DD MMM YYYY"
      time={showTime}
      min={new Date()}
      value={!value ? null : new Date(value)}
      placeholder={placeholder}
    />
);

const renderEndDatePicker = ({
  input: { onChange, value },
  showTime,
  placeholder,
  defaultValue }) => (
    <DateTimePicker
      onChange={onChange}
      format="DD MMM YYYY"
      time={showTime}
      min={defaultValue}
      value={!value ? null : new Date(value)}
      placeholder={placeholder}
    />
);
const setDefault = (props) => {
  if (props.search) {
    if (props.search.values) {
      return props.search.values.departDate;
    }
  }
  return new Date();
};
const enableSubmit = (props) => {
  if (props.search) {
    if (props.search.values) {
      if (Object.keys(props.search.values).length === 3) {
        return false;
      }
    }
  }
  return true;
};
class searchForm extends Component {
  render() {
    const { handleSubmit } = this.props;
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
                name="departDate"
                showTime={false}
                component={renderStartDatePicker}
                type="text"
                placeholder="Start Date"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <div className="budgetSearch" >
              <Field
                defaultValue={setDefault(this.props)}
                name="arrivalDate"
                showTime={false}
                component={renderEndDatePicker}
                type="text"
                placeholder="End Date"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <Button
              bsStyle="custom"
              type="submit"
              disabled={enableSubmit(this.props)}
              style={{ borderRadius: '0' }}
            >Submit</Button>
          </FormGroup>
        </Form>
      </center>
    </div>
    );
  }
}

renderStartDatePicker.defaultProps = {
  input: {},
  showTime: true,
  placeholder: '',
};

renderStartDatePicker.propTypes = {
  input: PropTypes.shape,
  showTime: PropTypes.bool,
  placeholder: PropTypes.string,
};

renderEndDatePicker.defaultProps = {
  input: {},
  showTime: true,
  placeholder: '',
  defaultValue: new Date(),
};

renderEndDatePicker.propTypes = {
  input: PropTypes.shape,
  showTime: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.instanceOf(Date),
};

searchForm.defaultProps = {
  handleSubmit: () => {},
};

searchForm.propTypes = {
  handleSubmit: PropTypes.func,
};

searchForm = reduxForm({
  form: 'search',  // a unique identifier for this form
})(searchForm);

const mapStateToProps = ({ form: { search } }) => ({
  search,
});

export default connect(mapStateToProps, null)(searchForm, renderEndDatePicker);
