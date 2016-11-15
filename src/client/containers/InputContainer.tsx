import { connect } from 'react-redux';

import Input from '../components/Input';
import { addChatAction } from '../actions/chatActions';

const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (message) => {
            dispatch(addChatAction(message));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Input);