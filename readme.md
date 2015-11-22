# react-conditional-render

[![build status][1]][2]

## install

```
npm install --save react-conditional-render
```

## Usage

let say you have a React component define like

```javascript
import React from 'react';

export default React.createClass({
  displayName: 'UserProfile',
  render() {
    return (
      <li>
        <div>Name : {this.props.user.name}</div>
        <div>Age : {this.props.user.age}</div>
        <div>Email : {this.props.user.email}</div>
      </li>
    );
  },
});
```

You can compose this component with `react-conditional-render` to use conditional rendering

```javascript
import React from 'react';
import EnhanceWithConditionalRendering from 'react-conditional-render';

const UserProfile = React.createClass({
  displayName: 'UserProfile',
  render() {
    return (
      <li>
        <div>Name : {this.props.user.name}</div>
        <div>Age : {this.props.user.age}</div>
        <div>Email : {this.props.user.email}</div>
      </li>
    );
  },
});

export default EnhanceWithConditionalRendering(UserProfile);
```

Then you can use this component in other component and use the `condition` property to render the `UserProfile` only if
the `condition` property value is truthy (or a function that returns a truthy value)

```javascript
import React from 'react';
import UserProfile from './userprofile';

export default React.createClass({
  getInitialState() {
    return {
      users: UserStore.all()
    };
  },
  render() {
    return (
      <ul>
        {this.state.users.map(user =>
          <UserProfile key={user.id} user={user} condition={user.age > 42} />)}
      </ul>
    );
  },
});
```

[1]: https://api.travis-ci.org/mathieuancelin/react-conditional-render.svg
[2]: https://api.travis-ci.org/mathieuancelin/react-conditional-render
