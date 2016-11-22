import {connect} from 'react-redux';

import UserBadge from '../components/UserBadge';

const mapStateToProps = state => ({
  profile: state.authReducer.profile
});

export default connect(mapStateToProps)(UserBadge);