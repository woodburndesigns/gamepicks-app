import React from 'react';
import { connect } from 'react-redux'; 
import { Card, Image, Dimmer, Label } from 'semantic-ui-react';
import { makePick } from '../../actions/pickActions';

const mapStateToProps = (state) => {
  return {
    games: state.games.games.filter(g => (g.week === state.games.currentWeek)),
    session: state.session,
  }
} 

class PickCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hovering: false };

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMouseOver() {
    this.setState({ hovering: true });
  }

  onMouseOut() {
    this.setState({ hovering: false });
  }
  
  onClick() {
console.log(this.props.game.id, this.props.team.id)    
/*
    this.props.dispatch(makePick({
      gameId: this.props.game.id,
      winnerId: this.props.team.id,
    }));
*/
  }

  render() {
    const team = this.props.team;

    // <Label corner={ this.props.home ? 'right' : 'left' } icon="trophy" />

    return (
      <Card
        size="small"
        onClick={ this.onClick }
        onMouseOver={ this.onMouseOver } 
        onMouseOut={ this.onMouseOut }
      >
        <Card.Content className="pick-card-image-area" textAlign="center">
          <Image src={ `build/images/${team.mascot.toLowerCase()}.gif` } />
          <Dimmer color="blue" active={ this.state.hovering }>Pick to Win</Dimmer>
        </Card.Content>
        <Card.Content>
          <Card.Header>
            { team.city } { team.mascot }
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              Joined in 2015
            </span>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(PickCard);