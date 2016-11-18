import * as React from 'react';

class TurnDisplay extends React.Component<any, any> {

  constructor(props) {
    super(props);
    console.log('turn display props', props);
    this.state = {
      time: 0
    };
  }
  private _countDown() {
    const time: Number = Math.floor((this.props.expiration - Date.now()) / 1000);
    this.setState({ time });
    // FIXME: this doesn't seem to be counting down
    console.log('setting new state', time, this.state.counting);
    this.setState({ timeout: setTimeout(this._countDown, 500) });
  }

  componentDidMount() {
    //this._countDown();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  };

  render() {
    return (
      <div className='turnDisplay'>
        <p>Turn #{this.props.turnNum} <span>Time Left: {this.state.time}</span></p>
        <p>{this.props.prompt}</p>
        {this.props.votes.map(choice => (
          <div id={choice.name}><span className='choice'>{choice.name}</span><span className='count'> {choice.count}</span></div>))
        }
      </div>
    );
  }

}
export default TurnDisplay;