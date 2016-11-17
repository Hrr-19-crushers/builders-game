import { connect } from 'react-redux';

import { Message } from '../reducers/chatReducer';
import Input from '../components/Input';
import { addChatAction } from '../actions/chatActions';
import { chat2Server } from '../utils/socket_io';

const mapStateToProps = (state) => {
    return {
        user: state.userState
    };
};

const parseChat = (message: Message, dispatch) => {
    if (message.text.indexOf('#') > -1) {
        const action = message.text.match(/\#\S+/gi);
        console.log(action);
        // const target = message.replace(/\#\S+/gi, '').replace();
    }
    return dispatch(addChatAction(message));
};

const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (message) => {
            chat2Server(message);
            parseChat(message, dispatch);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Input);