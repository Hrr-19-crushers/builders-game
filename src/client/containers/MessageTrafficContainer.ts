/// <reference path="../../../type-declarations/Object.d.ts" />
import {connect} from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';

import MessageTraffic from '../components/MessageTraffic';

const mapMessagesToTime = messages => {
  const now = Date.now();
  const levels = _.range(15)
    .map(n => -1 * n)
    .reverse()
    .reduce((memo, time) => {
      const ms = now - time * 60000;
      const total = messages.filter(msg => {
        const date = Date.parse(JSON.parse(msg.date));
        return date < ms && date > ms - 60000;
      });
      return Object.assign({}, memo, {[time]: total.length});
    }, {});
    return Object.keys(levels)
      .map(time => ({time, messages: levels[time]}))
      .sort((a,b) => a.time < b.time ? -1 : 1);
}

const mapStateToProps = state => ({
  messages: mapMessagesToTime(state.chatReducer.messages)
});

export default connect(mapStateToProps)(MessageTraffic);