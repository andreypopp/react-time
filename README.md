# react-time

Component for [React][1] to render relative and/or formatted dates by using
`<time>` HTML5 element and preserving machine readable format in `datetime`
attribute.

## Installation

    % npm install react-time

## Usage

    var Timestamp = require('react-time');

    MyComponent = React.createClass({
      render: function() {
        var now = new Date(),
            wasDate = new Date("Thu Jul 18 2013 15:48:59 GMT+0400");
        return (
          <div>
            <p>Today is <Timestamp value={now} format="YYYY/MM/DD" /></p>
            <p>This was <Timestamp value={wasDate} titleFormat="YYYY/MM/DD HH:mm" relative /></p>
            <p>This date is <Timestamp ifValueFalsy='unknown' />.</p>
          </div>
        );
      }
    });

[1]: https://facebook.github.io/react/
