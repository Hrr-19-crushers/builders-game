import * as React from 'react';
export default class Chat extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  public _onChange(event: any): void {
    this.setState({ input: event.target.value });
  }

  public render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.addChat({
            text: this.state.input,
            user: this.props.user || 'Guest',
            date: JSON.stringify(new Date())
          });
          this.setState({ input: '' });
        } }>
        <input id='input'
          value={this.state.input}
          onChange={e => this._onChange(e)}
          />
        <input type='submit' />
      </form>
    );
  }
};