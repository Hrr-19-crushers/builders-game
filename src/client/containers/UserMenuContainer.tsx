import { connect } from 'react-redux';

import UserMenu from '../components/UserMenu';

const mapStateToProps = (state) => {
  console.log(state.authReducer.isAuth)
  return {
    user: state.userState.name,
  };
};

export default connect(
    mapStateToProps
  )(UserMenu);