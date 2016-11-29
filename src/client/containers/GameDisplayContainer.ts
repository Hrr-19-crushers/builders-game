import {connect} from 'react-redux';

import GameDisplay from '../components/GameDisplay';

const mapStateToProps = state => ({
  users: state.statsState.clients,
  collected: state.gameState.collected
});

export default connect(mapStateToProps)(GameDisplay);