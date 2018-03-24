import React from 'react';
import { Grid } from 'semantic-ui-react';
import { SIDEBAR_WIDTH } from '../../constants';

class Content extends React.Component {
  render() {
    return (
      <div style={ { marginLeft: SIDEBAR_WIDTH } }>
        <Grid padded>
          <Grid.Column>
            { this.props.children }
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Content;