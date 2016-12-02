import { connect } from 'react-redux';

import Login from '../components/Login';

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
});

export default connect(mapStateToProps)(Login);