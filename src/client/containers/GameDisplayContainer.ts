import {connect} from 'react-redux';

import GameDisplay from '../components/GameDisplay';

const mapStateToProps = state => ({
  users: state.statsState.clients
});

export default connect(mapStateToProps)(GameDisplay);