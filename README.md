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
            <p>Today is <Timestamp value={now} format="YYYY/mm/dd" /></p>
            <p>This was <Timestamp value={wasDate} relative /></p>
          </div>
        );
      }
    });

[1]: https://facebool.github.io/react/
