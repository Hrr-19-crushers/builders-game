import React from 'react';
import {render} from 'react-dom';

import HelloWorld from './components/react';

const forty: number = 42;

render(<HelloWorld />, document.getElementById('app'));