import { connect } from 'react-redux';

import UserMenu from '../components/UserMenu';

const mapStateToProps = state => ({
  user: state.userState.name,
});

export default connect(
    mapStateToProps
  )(UserMenu);