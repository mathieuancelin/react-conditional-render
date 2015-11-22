import React from 'react';

function isObject(χ) {
  return !!χ && (typeof χ === 'object' || typeof χ === 'function');
}

function isFunction(χ) {
  return isObject(χ) && Object.prototype.toString.call(χ) === '[object Function]';
}

function isTruthy(expression) {
  return !!expression;
}

export default function enhanceWithConditionalRendering(Component) {
  return React.createClass({
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
