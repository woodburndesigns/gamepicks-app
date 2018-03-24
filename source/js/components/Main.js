import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Picks from './Picks';
import Standings from './Standings';
import Games from './Games';
import Logout from './Logout';
import { fetchSession } from '../actions/sessionActions';
import { fetchGames } from '../actions/gameActions';

const mapStateToProps = (store) => {
  return {
    isAuthenticated: store.session.isAuthenticated,
    games: store.games.games,
    session: store.session,
  }
};

class Main extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchSession());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
      this.props.dispatch(fetchGames());
    }
  }

  getAuthorizedRoutes() {
    let result;
    
    if (this.props.isAuthenticated) {
      result = [
        <Route key="dashboard"  path="/dashboard" component={ Dashboard } />,
        <Route key="picks"  path="/picks" component={ Picks } />,
        <Route key="schedule"  path="/schedule" component={ Games } />,
        <Route key="standings"  path="/standings" component={ Standings } />,
        <Route key="logout"  path="/logout" component={ Logout } />,
      ];
    } else {
      result = <Redirect to={{ pathname: '/', state: { from: this.props.location }}} />;
    }

    return result;
  }

  render() {
    const authorizedRoutes = this.getAuthorizedRoutes();

    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/register" component={ Register } />
        { authorizedRoutes }
      </Switch>
    )
  }
}

export default connect(mapStateToProps)(Main);
