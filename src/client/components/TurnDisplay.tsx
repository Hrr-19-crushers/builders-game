import * as React from 'react';
import HealthbarContainer from '../containers/HealthbarContainer';

class TurnDisplay extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    //this._countDown();
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  };

  render() {
    // this if/else control is for displaying turn-based scenarios
    if (this.props.prompt) {
      return (
        <div className='turnDisplay'>
          <p>{this.props.prompt}</p>
          {this.props.votes.map(choice => (
            <div key={choice.name}><span className='choice'>{choice.name}</span><span className='count'> {choice.count}</span></div>))
          }
        </div>
      );
    } else {
      return(
        <div className='turnDisplay'>
          <p>Perilous is a multiplayer adventure controlled by chat.</p>
          <p>Open world play! Type in '\up', '\down', '\left', or '\right' to explore</p>
        </div>
      );
    }
  }
}
export default TurnDisplay;