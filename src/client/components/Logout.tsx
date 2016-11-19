import React, {Component} from 'react'

export default class Logout extends Component <any,any>{
  
  render() {
    
    return (
      <button onClick={() => this.props.onLogoutClick()}>
        Logout
      </button>
    )
  }
}