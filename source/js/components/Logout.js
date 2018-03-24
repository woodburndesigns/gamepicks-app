import React from 'react';
import { connect } from 'react-redux';
import { destroySession } from '../actions/sessionActions';

const mapStateToProps = (state) => {
  return {
    session: state.session,
  }
};

class Logout extends React.Component {

  componentWillMount() {
    this.props.dispatch(destroySession());
  }

  render() {
    return null
  }
}

export default connect(mapStateToProps)(Logout);
