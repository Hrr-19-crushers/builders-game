import { connect } from 'react-redux';

import Input from '../components/Input';
import { addChatAction } from '../actions/chatActions';

const mapStateToProps = (state) => {
    return {
        user: state.userState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (message) => {
            dispatch(addChatAction(message));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Input);