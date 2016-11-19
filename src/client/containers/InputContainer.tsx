import {connect} from 'react-redux';

import {Message} from '../reducers/chatReducer';
import Input from '../components/Input';
import {addChatAction} from '../actions/chatActions';
import {chat2Server} from '../utils/socket_io';

const mapStateToProps = (state) => ({user: state.userState.name});

const mapDispatchToProps = (dispatch) => ({
  addChat: (message) => {
    chat2Server(message);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Input);