import * as React from 'react';

export default class Game extends React.Component < any, any > {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // runGame();
    }

    render() {
        return (
            <div className='game' id='game'></div>
        );
    }
}