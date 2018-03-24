import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../helpers/api';
import { createSession, loginError } from '../actions/sessionActions';
import { Grid, Button, Input, Form, Message } from 'semantic-ui-react';

const mapStateToProps = (state) => {
  return {
    session: state.session,
    error: state.session.loginError,
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.email.inputRef.value;
    const password = this.password.inputRef.value;

    if  (!email || !password) {
      this.props.dispatch(loginError('Please provide a username and password'));
    } else {
      this.props.dispatch(createSession({ email, password }));
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
            <Form.Field>
              <label>Email</label>
              <Input ref={ c => ( this.email = c ) } />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input ref={ c => ( this.password = c ) } type="password" />
            </Form.Field>
            <Button fluid primary size="large" type="submit">Log In</Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(Login);
