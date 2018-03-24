import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import { SIDEBAR_WIDTH } from '../../constants';

class Sidebar extends React.Component {
  render() {
    return (
      <Menu vertical fixed='left' inverted style={ { width: SIDEBAR_WIDTH } }>
        <Menu.Item name='home'>
          <strong>NFL Pick'em</strong>
        </Menu.Item>
        <Menu.Item>
          <Menu.Menu>
            <Menu.Item as={ NavLink } to='/dashboard'>
              Dashboard
            </Menu.Item>
            <Menu.Item as={ NavLink } to='/picks'>
              Weekly Picks
            </Menu.Item>
            <Menu.Item as={ NavLink } to='/schedule'>
              Schedule
            </Menu.Item>
            <Menu.Item as={ NavLink } to='/standings'>
              Standings
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item as={ NavLink } to="/logout">
          <Icon name='log out' /> Logout
        </Menu.Item>
      </Menu>
    )
  }
}

export default Sidebar;