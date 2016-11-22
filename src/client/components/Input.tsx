import * as React from 'react';

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
    if (e.keyCode === 37) 
      return this._submitChat('\\left');
    if (e.keyCode === 38) 
      return this._submitChat('\\up');
    if (e.keyCode === 39) 
      return this._submitChat('\\right');
    if (e.keyCode === 40) 
      return this._submitChat('\\down');
    }
  
  public render() {
    return (
<<<<<<< HEAD
      <div onKeyDown={this
        .onKeyDown
        .bind(this)}>
        <form
          className='inputForm'
          onSubmit={this
          .onSubmit
          .bind(this)}>
          <input value={this.state.input} onChange={e => this._onChange(e)} autoFocus />
          <input className='submitButton' type='submit'/>
        </form>
      </div>
    )
  }
}