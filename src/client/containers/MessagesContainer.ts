import {connect} from 'react-redux';

import Messages from '../components/Messages';

const mapStateToProps = (state) => ({
  user: state.userState.name, 
  messages: state.chatReducer.messages
});

export default connect(mapStateToProps)(Messages);