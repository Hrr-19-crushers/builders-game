import * as React from 'react';
import {runGame} from '../game';

export default class Game extends React.Component < any,
any > {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        runGame();
    }

    render() {
        return (
            <div id='game'></div>
        );
    }
}