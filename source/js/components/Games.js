import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Header,
  Dimmer,
  Loader,
  Table,
  Icon,
  Menu,
  Label,
  Dropdown,
  Segment
} from 'semantic-ui-react';
import Sidebar from './partials/Sidebar';
import Content from './partials/Content';
import { fetchGames, changeWeek } from '../actions/gameActions';

const mapStateToProps = (state) => {
  return {
    loading: state.games.loading,
    currentWeek: state.games.currentWeek,
    selectedWeek: state.games.selectedWeek,
    games: state.games.games,
  }
} 

class Games extends React.Component {

  constructor(props) {
    super(props);

    this.onWeekClick = this.onWeekClick.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(changeWeek(null));
  }

  onWeekClick(e, data) {
    this.props.dispatch(changeWeek(data.children));
  }

  getHeaderCells(game) {
    return Object.keys(game).map((column, i) => (
      <Table.HeaderCell key={ `header-${i}`}>{column}</Table.HeaderCell>
    ));
  }

  getCells(game, row) {
    return Object.keys(game).map((column, i) => (
      <Table.Cell key={ `row-${row}-cell-${i}` }>{game[column]}</Table.Cell>
    ));
  }

  getWeeks() {
    const currentWeek = this.props.currentWeek;
    let selectedWeek = this.props.selectedWeek;
    let jsx = [];
    let week = 1;

    selectedWeek = selectedWeek || currentWeek;

    while (week <= 17) {
      jsx.push(
        <Menu.Item
          key={ `week-${week}` }
          as='a'
          onClick={ this.onWeekClick }
          active={ selectedWeek === week }
        >
          { week }
        </Menu.Item>
      );

      week += 1;
    }

    return jsx;
  }

  renderHeader() {
    return (
      <Menu size="small">
        <Menu.Item header>Season</Menu.Item>
        <Menu.Item>
          <Dropdown placeholder='Season' value="2017" options={[{value: '2017', text: '2017'}]} />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item header>Week</Menu.Item>
          { this.getWeeks() }
        </Menu.Menu>
      </Menu>
    );
  }

  getGames() {
    const { selectedWeek, currentWeek, loading, location } = this.props;
    const team = parseInt(new URLSearchParams(location.search).get('team'));
    let jsx;

    let games = this.props.games.filter(game => {
      let match;

      const teamMatch = team ? game.homeTeam.id === team || game.awayTeam.id === team : true;
      const weekMatch = selectedWeek ? selectedWeek === game.week : true;
      const currentWeekMatch = currentWeek && !selectedWeek ? currentWeek === game.week : true;

      match = teamMatch && weekMatch && currentWeekMatch;

      return match;
    });

    if (loading) {
      jsx = <Loader />;
    } else if (games.length > 0) { 
      const gamesArray = games.map(game => {
        const homeScore = game.homeTeamScore;
        const awayScore = game.awayTeamScore;
        let score;

        if (awayScore !== null || homeScore !== null) {
          score = `${awayScore} - ${homeScore}`;
        }

        const awayTeam = `${game.awayTeam.city} ${game.awayTeam.mascot}`;
        const homeTeam = `${game.homeTeam.city} ${game.homeTeam.mascot}`;

        return {
          week: game.week,
          'game time': `${game.day} @ ${game.time}`,
          'away team': score && homeScore < awayScore ? <strong>{ awayTeam }</strong> : awayTeam,
          'home team': score && homeScore > awayScore ? <strong>{ homeTeam }</strong> : homeTeam,
          score,
        }
      });

      const headers = <Table.Row><Table.HeaderCell />{ this.getHeaderCells(gamesArray[0])}</Table.Row>;
      const gameRows = gamesArray.map((game, i) => {
        return (
          <Table.Row key={ `row-${i}` }>
            <Table.Cell collapsing>
              <Link
                to={{ pathname: '/picks', search: `?game=${games[i].id}` }} 
                title="game picks"
              >
                <Icon name="list layout" />
              </Link>
            </Table.Cell>
            { this.getCells(game, i) }
          </Table.Row>
        )
      });

      jsx = (
        <div>
          { this.renderHeader() }
          <Table sortable>
            <Table.Header>
              { headers }
            </Table.Header>
            <Table.Body>
              { gameRows }
            </Table.Body>
          </Table>
        </div>
      )
    } else {
      jsx = (
        <div>
          { this.renderHeader() }
          <Segment basic textAlign="center">
            <p>There are no games available</p>
          </Segment>
        </div>
      )
    }

    return jsx;
  }

  render() {
    let games = this.getGames();

    return (
      <div>
        <Sidebar />
        <Content>
          <Header as="h1">Schedule</Header>
          { games }
        </Content>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Games);
