import { connect } from 'react-redux';

import NavBar from '../components/NavBar';

const mapStateToProps = (state) => {
  console.log(state)
  return {
    isAuth: state.authReducer.isAuth
  };
};


export default connect(
    mapStateToProps
)(NavBar);