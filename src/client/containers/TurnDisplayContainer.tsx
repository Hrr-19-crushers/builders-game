import * as React from 'react';
import { connect } from 'react-redux';

import TurnDisplay from '../components/TurnDisplay';

const mapStateToProps = state => ({
  prompt: state.gameState.turn ? state.gameState.turn.prompt : null,
  votes: state.gameState.turn ? state.gameState.turn.votes : null
});

export default connect(mapStateToProps)(TurnDisplay);