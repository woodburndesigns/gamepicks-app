import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../helpers/api';
import { registerSession, registrationError } from '../actions/sessionActions';
import { Grid, Button, Input, Form, Message } from 'semantic-ui-react';

const mapStateToProps = (state) => {
  return {
    session: state.session,
    error: state.session.registrationError,
  }
};

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const firstname = this.firstname.inputRef.value;
    const lastname = this.lastname.inputRef.value;
    const email = this.email.inputRef.value;
    const password = this.password.inputRef.value;

    if  (!firstname || !lastname || !email || !password) {
      this.props.dispatch(registrationError('All fields are required'));
    } else {
      this.props.dispatch(registerSession({ firstname, lastname, email, password }));
    }
  }

  getErrorMessage() {
    let msg;

    if (this.props.error) {
      msg = <Message warning size="tiny" content={ this.props.error }/>;
    }

    return msg;
  }

  render() {
    if (this.props.session.isAuthenticated) {
      return <Redirect to={{ pathname: '/dashboard', state: { from: this.props.location }}} />
    }

    const errorMessage = this.getErrorMessage();

    return (
      <Grid centered padded>
        <Grid.Column mobile={ 14 } tablet={ 10 } computer={ 6 }>
          { errorMessage }
          <Form onSubmit={ this.onSubmit }>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>First Name</label>
                <Input ref={ c => ( this.firstname = c ) } />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <Input ref={ c => ( this.lastname = c ) } />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Email</label>
              <Input ref={ c => ( this.email = c ) } />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input ref={ c => ( this.password = c ) } type="password" />
            </Form.Field>
            <Button fluid primary size="large" type="submit">Register</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Register);
