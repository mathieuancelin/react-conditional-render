/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, react/no-multi-comp: 0, new-cap: 0 */

import EnhanceWithCR from '../src/index';
import React from 'react';
import chai, {expect} from 'chai';
import ReactTestUtils from 'react-addons-test-utils';

const Cell = EnhanceWithCR(React.createClass({
  render() {
    return (
      <li id="cell-{this.props.value}">{this.props.value}</li>
    );
  },
}));

const App = React.createClass({
  getDefaultProps() {
    return {
      values: [1, 2, 3, 4, 5, 6],
    };
  },
  render() {
    return (
      <ul>
        {this.props.values.map(value => <Cell value={value} condition={value % 2 === 0} />)}
      </ul>
    );
  },
});

const App2 = React.createClass({
  getDefaultProps() {
    return {
      values: [1, 2, 3, 4, 5, 6],
    };
  },
  render() {
    return (
      <ul>
        {this.props.values.map(value => <Cell key={value} value={value} condition={() => value % 2 === 0} />)}
      </ul>
    );
  },
});

const App3 = React.createClass({
  getDefaultProps() {
    return {
      values: [1, 2, 3, 4, 5, 6],
    };
  },
  render() {
    return (
      <ul>
        {this.props.values.map(value => <Cell key={value} value={value} condition={value} />)}
      </ul>
    );
  },
});

const App4 = React.createClass({
  getDefaultProps() {
    return {
      values: [1, 2, 3, 4, 5, 6],
    };
  },
  render() {
    return (
      <ul>
        {this.props.values.map(value => <Cell key={value} value={value} condition={null} />)}
      </ul>
    );
  },
});

const App5 = React.createClass({
  getInitialState() {
    return {
      values: [1, 2, 3, 4, 5, 6],
    };
  },
  update() {
    this.setState({ values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] });
  },
  render() {
    return (
      <div>
        <button type="button" onClick={this.update}>click</button>
        <ul>
          {this.state.values.map(value => <Cell key={value} value={value} condition={value % 2 === 0} />)}
        </ul>
      </div>
    );
  },
});


describe('App', () => {
  it('should render only 3 items', () => {
    const app = ReactTestUtils.renderIntoDocument(<App />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(3);
  });
  it('should render only 3 items with function conditions', () => {
    const app = ReactTestUtils.renderIntoDocument(<App2 />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(3);
  });
  it('should render only 6 items', () => {
    const app = ReactTestUtils.renderIntoDocument(<App3 />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(6);
  });
  it('should render only 0 items', () => {
    const app = ReactTestUtils.renderIntoDocument(<App4 />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(0);
  });
  it('should support state update', () => {
    const app = ReactTestUtils.renderIntoDocument(<App5 />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'button');
    expect(li.length).to.be.equal(3);
    ReactTestUtils.Simulate.click(button);
    const lis = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(lis.length).to.be.equal(7);
  });
});
