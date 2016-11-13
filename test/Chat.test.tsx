import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';
import Chat from '../src/client/components/Chat';

describe('Hello', () => {
  let renderer;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
    renderer.render(<Chat />);
  });

  it('should render correctly', () => {
    const result = renderer.getRenderOutput();
    chai.assert.strictEqual(result.type, 'div');
  });

  it('should have correct prop values', () => {
    const result = renderer.getRenderOutput();
    const propValues = result.props.children.join('');
    chai.assert.strictEqual(propValues, 'Hello, Willson');
  });
});