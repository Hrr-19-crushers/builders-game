import { connect } from 'react-redux';

import Chat from '../components/Chat';

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(actionCreator)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);