import {connect} from 'react-redux';
import WinLose from '../components/WinLose';

const mapStateToProps = state => ({
  win: state.gameState.collected === 8,
  lose: state.gameState.charState.charHealth <= 0
});

export default connect(mapStateToProps)(WinLose);