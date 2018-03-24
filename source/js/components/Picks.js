import React from 'react';
import { connect } from 'react-redux';
import { Header, Card, Image, Dimmer, Divider, Container } from 'semantic-ui-react';
import Sidebar from './partials/Sidebar';
import Content from './partials/Content';
import PickCard from './partials/PickCard';

const mapStateToProps = (state) => {
  return {
    currentWeek: state.games.currentWeek,
    games: state.games.games.filter(g => (g.week === state.games.currentWeek)),
    session: state.session,
  }
} 

class Picks extends React.Component {

  renderTeamCard(team, game, pick, home) {
    return (
      <PickCard team={ team } game={ game } pick={ pick } home={ home } />
    );
  }

  renderGames() {
    let jsx;

    return this.props.games.map(g => {
      return (
        <Container>
          <Card.Group>
            { this.renderTeamCard(g.awayTeam, g, false) }            
            { this.renderTeamCard(g.homeTeam, g, true) }
          </Card.Group>
          <Divider />
        </Container>
      );
    });
  }

  render() {
    const games = this.renderGames();

    return (
      <div>
        <Sidebar />
        <Content>
          <Header as='h1'>Week { this.props.currentWeek } Picks</Header>
          { games }
        </Content>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Picks);
