import * as React from 'react'

export default class Login extends React.Component <any,any>{
  render() {
    return (
      <div>
        <button onClick={ () => this.props.logIn() } >
          Login
        </button>
      </div>
    )
  }
  
}
