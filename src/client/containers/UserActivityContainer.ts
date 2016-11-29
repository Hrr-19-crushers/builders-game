/// <reference path="../../../type-declarations/Object.d.ts" />
import {connect} from 'react-redux';

import UserActivity from '../components/UserActivity';

const mapMessagesToUsers = messages => {
  const userNumbers = messages
    .reduce((memo, msg) => {
      if (!memo[msg.user]) {
        return Object.assign({}, memo, {[msg.user]:1});
      }
      return Object.assign({}, memo, {[msg.user]: memo[msg.user] + 1});
    }, {});
  return Object.keys(userNumbers)
    .map(name => ({name, messages: userNumbers[name]}))
    .sort((a, b) => a.messages <= b.messages ? 1: -1)
    .slice(0,5);
}
const mapStateToProps = state => ({
  users: mapMessagesToUsers(state.chatReducer.messages)
});

export default connect(mapStateToProps)(UserActivity);