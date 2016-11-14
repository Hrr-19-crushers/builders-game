import * as React from 'react';
import { onClick } from '../utils/socket_io';
export default class Chat extends React.Component<any, any> {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            input: ''
        };
    }

    public _onChange(event: any): void {
        this.setState({ input: event.target.value });
    }

    public render() {
        // const displays = this.props.messages.map(message => (<li>{message.name}says {message.text}</li>));
        return (
            <div>
                <input id='input'
                    value={this.state.input}
                    onChange={e => this._onChange(e)}
                    />
                <button
                    onClick={() => {
                        console.log('input', this.state.input);
                        this.props.addChat({
                            text: this.state.input,
                            user: 'David',
                            date: JSON.stringify(new Date())
                        });
                        this.setState({ input: '' });
                    } }
                    >Send</button>;
        </div >
        );
    }
};