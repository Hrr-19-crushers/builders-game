import {connect} from 'react-redux';

import UserActivity from '../components/UserActivity';

const mapMessagesToUsers = messages => {
  const userNumbers = messages
    .reduce((memo, msg) => {
      if (!memo[msg.user]) {
        memo[msg.user] = 0;
      }
      memo[msg.user]++;
      return memo;
    }, {});
  return Object.keys(userNumbers)
    .filter(name => name !== '👹')
    .map(name => ({name, messages: userNumbers[name]}))
    .sort((a, b) => a.messages <= b.messages ? 1: -1)
    .slice(0,5);
}
const mapStateToProps = state => ({
  users: mapMessagesToUsers(state.chatReducer.messages)
});

export default connect(mapStateToProps)(UserActivity);