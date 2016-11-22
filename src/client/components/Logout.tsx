import * as React from 'react'

export default class Logout extends React.Component <any,any>{
  
  render() {
    
    return (
      <button onClick={ () => this.props.logOut() }>
        Logout
      </button>
    )
  }
}