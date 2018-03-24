import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dimmer, Grid, Header, Loader, Segment, Table } from 'semantic-ui-react';
import Sidebar from './partials/Sidebar';
import Content from './partials/Content';
import { fetchStandings } from '../actions/standingActions';

const mapStateToProps = (state) => {
  return {
    loading: state.standings.loading,
    error: state.standings.error,
    standings: state.standings.standings,
  }
} 

class Standings extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchStandings());
  }

  getDivisionTable(division) {
    return (
      <Table size="small" compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Wins</Table.HeaderCell>
            <Table.HeaderCell>Losses</Table.HeaderCell>
            <Table.HeaderCell>Ties</Table.HeaderCell>
            <Table.HeaderCell>Win %</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.props.standings.filter(s => (s.team.division.name === division))
              .map(standing => {
                let cells = [];
                
                cells.push(
                  <Table.Cell>
                    <Link to={ { pathname: '/schedule', search: `?team=${standing.team.id}` } }>
                      {standing.team.city} {standing.team.mascot}
                    </Link>
                  </Table.Cell>
                );

                ['wins', 'losses', 'ties', 'winPct'].forEach(column => {
                  cells.push(<Table.Cell>{ standing[column] }</Table.Cell>);
                });

                return <Table.Row>{cells}</Table.Row>;
              })
          }
        </Table.Body>
      </Table>
    )
  }

  getStandings() {
    const { loading, standings } = this.props;
    let jsx;

    if (loading) {
      jsx = <Segment><Dimmer active inverted><Loader inverted /></Dimmer></Segment>;
    } else if (standings.length > 0) {
      jsx = (
        <Grid columns={2}>
          <Grid.Column>
            <Header>American Football Conference</Header>
            { this.getDivisionTable('East (AFC)') }
            { this.getDivisionTable('North (AFC)') }
            { this.getDivisionTable('South (AFC)') }
            { this.getDivisionTable('West (AFC)') }
          </Grid.Column>
          <Grid.Column>
            <Header>National Football Conference</Header>
            { this.getDivisionTable('East (NFC)') }
            { this.getDivisionTable('North (NFC)') }
            { this.getDivisionTable('South (NFC)') }
            { this.getDivisionTable('West (NFC)') }
          </Grid.Column>
        </Grid>
      );
    }

    return jsx;
  }

  render() {
    const standings = this.getStandings();

    return (
      <div>
        <Sidebar />
        <Content>
          <Header as='h1'>Standings</Header>
          { standings }
        </Content>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Standings);
