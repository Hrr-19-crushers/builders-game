import { connect } from 'react-redux';

import { Message } from '../reducers/chatReducer';
import Input from '../components/Input';
import { addChatAction , chatBotAction} from '../actions/chatActions';
import { chat2Server } from '../utils/socket_io';
import chatActionMiddleWare from '../utils/AddChatMiddleware';

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth,
    user: state.userState.name
});

const mapDispatchToProps = dispatch => ({
    addChat: (message) => {
      chatActionMiddleWare(addChatAction(message), dispatch);
    },
    authError: (message) => { 
      dispatch(chatBotAction(message))
    }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);