/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, react/no-multi-comp: 0, new-cap: 0 */

import EnhanceWithCR, { Conditional, withConditionalRendering } from '../src/index';
import React from 'react';
import chai, {expect} from 'chai';
import ReactTestUtils from 'react-addons-test-utils';

const Cell = withConditionalRendering(React.createClass({
  displayName: 'Cell',
  render() {
    return (
      <li id="cell-{this.props.value}">{this.props.value}</li>
    );
  },
}));

describe('App', () => {
  it('should render only 3 items', () => {
    const App = React.createClass({
      getDefaultProps() {
        return {
          values: [1, 2, 3, 4, 5, 6],
        };
      },
      render() {
        return (
          <ul>
            {this.props.values.map(value => <Cell key={value} value={value} condition={value % 2 === 0} />)}
          </ul>
        );
      },
    });
    const app = ReactTestUtils.renderIntoDocument(<App />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(3);
  });
  it('should render only 3 items with pure html wrapping', () => {
    const App = React.createClass({
      getDefaultProps() {
        return {
          values: [1, 2, 3, 4, 5, 6],
        };
      },
      render() {
        return (
          <ul>
            {this.props.values.map(value => (
              <Conditional key={value} condition={value % 2 === 0}>
                <li id="cell-{value}">{value}</li>
              </Conditional>
            ))}
          </ul>
        );
      },
    });
    const app = ReactTestUtils.renderIntoDocument(<App />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(3);
  });

  it('should render only 3 items with function conditions', () => {
    const App = React.createClass({
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
    const app = ReactTestUtils.renderIntoDocument(<App />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(3);
  });

  it('should render only 6 items', () => {
    const App = React.createClass({
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
    const app = ReactTestUtils.renderIntoDocument(<App />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(6);
  });

  it('should render only 0 items', () => {
    const App = React.createClass({
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
    const app = ReactTestUtils.renderIntoDocument(<App />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(li.length).to.be.equal(0);
  });

  it('should support state update', () => {
    document.body.innerHTML = '';
    const App = React.createClass({
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
    const app = ReactTestUtils.renderIntoDocument(<App />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'button');
    expect(li.length).to.be.equal(3);
    ReactTestUtils.Simulate.click(button);
    const lis = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(lis.length).to.be.equal(7);
  });

  it('should support state update with pure HTML wrapping', () => {
    document.body.innerHTML = '';
    const App = React.createClass({
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
              {this.state.values.map(value => (
                <Conditional key={value} condition={value % 2 === 0}>
                  <li id="cell-{value}">{value}</li>
                </Conditional>
              ))}
            </ul>
          </div>
        );
      },
    });
    const app = ReactTestUtils.renderIntoDocument(<App />);
    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(app, 'button');
    expect(li.length).to.be.equal(3);
    ReactTestUtils.Simulate.click(button);
    const lis = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'li');
    expect(lis.length).to.be.equal(7);
  });
});
