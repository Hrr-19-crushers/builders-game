import * as React from 'react';
import { connect } from 'react-redux';

import TurnDisplay from '../components/TurnDisplay';

const mapStateToProps = state => ({
  turnNum: state.gameState.turnNumber,
  prompt: state.gameState.turn.prompt,
  votes: state.gameState.turn.votes
});

export default connect(mapStateToProps)(TurnDisplay);