import React from 'react';
import { Header } from 'semantic-ui-react';
import Sidebar from './partials/Sidebar';
import Content from './partials/Content';

const mapStateToProps = (state) => {
  return {
    session: state.session,
  }
} 

class Users extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Content>
          <Header as='h1'>Users</Header>
        </Content>
      </div>
    );
  }
}

export default Users;
