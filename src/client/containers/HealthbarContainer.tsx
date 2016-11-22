import {connect} from 'react-redux';

import Healthbar from '../components/Healthbar';

const mapStateToProps = state => ({
  health: state.gameState.charState.charHealth
});

export default connect(mapStateToProps)(Healthbar);