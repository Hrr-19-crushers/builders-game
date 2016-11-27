import * as React from 'react';
import Dpad from './Dpad';

export default class Chat extends React.Component < any,
any > {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  public _onChange(event : any) : void {
    this.setState({input: event.target.value});
  }

  private _submitChat(message : String) {
    this
      .props
      .addChat({
        text: message,
        user: this.props.user || 'Guest',
        date: JSON.stringify(new Date())
      });
  }

  onSubmit(e : any) {
    e.preventDefault();
    this._submitChat(this.state.input);
    this.setState({input: ''});
  }

  onKeyDown(e : any) {
    const fakeKeyDown = id => {
      const btn = document
        .getElementById(id)
        .classList
      btn.add('fakeHover');
      setTimeout(() => btn.remove('fakeHover'), 200);
    }
    if (e.keyCode === 37) {
      fakeKeyDown('d-left');
      return this._submitChat('\\left');
    }
    if (e.keyCode === 38) {
      fakeKeyDown('d-up');
      return this._submitChat('\\up');
    }
    if (e.keyCode === 39) {
      fakeKeyDown('d-right');
      return this._submitChat('\\right');
    }
    if (e.keyCode === 40) {
      fakeKeyDown('d-down');
      return this._submitChat('\\down');
    }
    if (e.keyCode === 65) {
      fakeKeyDown('control-a');
      return this._submitChat('\\A');
    }
    if (e.keyCode === 66) {
      fakeKeyDown('control-b');
      return this._submitChat('\\B');
    }
  }

  public render() {
    return (
      <div
        className='inputForm'
        onKeyDown={this
        .onKeyDown
        .bind(this)}>
        <Dpad
          move={function (dir) {
          this._submitChat('\\' + dir)
        }.bind(this)}/>
        <form onSubmit={this
          .onSubmit
          .bind(this)}>
          <input value={this.state.input} onChange={e => this._onChange(e)} autoFocus/>
          <input className='submitButton' type='submit'/>
        </form>
      </div>
    )
  }
}