import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// components
import Form from 'components/FormElements/Form';
import Input from 'components/FormElements/Input';
import Label from 'components/FormElements/Label';
import Error from 'components/FormElements/Error';
import Button from 'components/FormElements/Button';
import Textarea from 'components/FormElements/Textarea';
import AutoComplete from 'components/AutoComplete';

// actions
import {
  messageFetch,
  messageSendMore,
} from 'store/senderMessage/actions';

// utils
import { checkSender } from 'utils/validation';

// styles
import './styles/sender.scss';

class SenderMessage extends Component {
  state = {
    form: {
      email: '',
      body: '',
    },
    error: null,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { form } = this.state;
    const { messageFetch } = this.props;
    const { error, fields } = checkSender(form);

    if (error) {
      return this.setState({ error: fields });
    }

    messageFetch(form);
  }

  handleClick = (email) => {
    const { form  } = this.state;

    this.setState({ form: { ...form, email } });
  }

  handleChange = (name, value) => {
    const { form  } = this.state;

    this.resetError([name]);
    this.setState({ form: { ...form, [name]: value } });
  }

  handleSendMore = () => {
    const { messageSendMore } = this.props;

    this.resetForm();
    messageSendMore();
  }

  resetForm = () => {
    this.setState({ form: { email: '', body: '' } });
  }

  resetError = (name) => {
    const { error  } = this.state;
    if (!error) {
      return;
    }

    this.setState({ error: { ...error, [name]: null } });
  }

  resetAllErrors = () => {
    const { error  } = this.state;
    if (!error) {
      return;
    }

    this.setState({ error: null });
  }

  render() {
    const { successMessage } = this.props;
    const { error, form: { email, body } } = this.state;
    const emailError = error && error.email;
    const bodyError = error && error.body;

    if (successMessage) {
      return (
        <div>
          <p className="success">
            success!
          </p>
          <div className="label-container">
            <Button onClick={this.handleSendMore}>
              Send more
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div className="label-container">
            <Label htmlFor="email">
              Email:
            </Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={email}
              error={!!emailError}
              onFocus={this.resetError}
              onChange={this.handleChange} />
            { email ? <AutoComplete input={email} onClick={this.handleClick} /> : null}
            { emailError ? <Error msg={emailError} /> : null }
          </div>
          <div className="label-container">
            <Label htmlFor="body">
              Message body:
            </Label>
            <Textarea
              id="body"
              name="body"
              value={body}
              error={!!bodyError}
              onFocus={this.resetError}
              onChange={this.handleChange} />
            { bodyError ? <Error msg={bodyError} /> : null }
          </div>
          <div className="label-container">
            <Button disabled={!!emailError || !!bodyError}>
              Send message!
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  successMessage: state.senderMessage.get('successMessage'),
});

const mapDispatchToProps = {
  messageFetch,
  messageSendMore,
};

export default connect(mapStateToProps, mapDispatchToProps)(SenderMessage);
