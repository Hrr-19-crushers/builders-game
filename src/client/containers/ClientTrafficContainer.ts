/// <reference path="../../../type-declarations/Object.d.ts" />
import {connect} from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';

import MessageTraffic from '../components/MessageTraffic';

const mapStateToProps = state => ({
  data: state.statsState.clientSlices.map(slice => Object.assign({}, slice, {
    date: moment(slice.date).fromNow()
  })),
  type: 'clients',
  text: 'are playing the game'
});

export default connect(mapStateToProps)(MessageTraffic);