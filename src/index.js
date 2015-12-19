import React from 'react';

let counter = 0;

function isObject(χ) {
  return !!χ && (typeof χ === 'object' || typeof χ === 'function');
}

function isFunction(χ) {
  return isObject(χ) && Object.prototype.toString.call(χ) === '[object Function]';
}

function isTruthy(expression) {
  return !!expression;
}

export const Conditional = React.createClass({
  propTypes: {
    children: React.PropTypes.element,
    condition: React.PropTypes.any,
  },
  getDefaultProps() {
    return {
      condition: true,
      children: null,
    };
  },
  render() {
    let condition = this.props.condition;
    if (isFunction(condition)) {
      condition = condition();
    }
    if (isTruthy(condition)) {
      return this.props.children;
    } else {
      return null;
    }
  },
});

export function withConditionalRendering(Component) {
  counter = counter + 1;
  let displayName = `ConditionalRenderingComponent-${counter}`;
  if (Component.prototype
      && Component.prototype.constructor
      && Component.prototype.constructor.displayName) {
    displayName = `${Component.prototype.constructor.displayName}_Wrapper`;
  }
  return React.createClass({
    displayName,
    propTypes: {
      condition: React.PropTypes.any,
    },
    getDefaultProps() {
      return {
        condition: true,
      };
    },
    render() {
      let condition = this.props.condition;
      if (isFunction(condition)) {
        condition = condition();
      }
      if (isTruthy(condition)) {
        return (
          <Component {...this.props} />
        );
      } else {
        return null;
      }
    },
  });
}
