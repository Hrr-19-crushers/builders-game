import React, { Component} from 'react'

export default class Login extends Component <any,any>{
  
  render() {
    
    return (
      <div>
        <button onClick={() => this.props.onLoginClick()} >
          Login
        </button>
      </div>
    )
  }
  
}
