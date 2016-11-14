import { connect } from 'react-redux';

import Chat from '../components/Chat';
import { addChatAction } from '../actions/chatActions';

const mapStateToProps = (state) => {
    return {
        messages: state.chatReducer.messages
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (message) => {
            console.log(addChatAction(message));
            dispatch(addChatAction(message));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);