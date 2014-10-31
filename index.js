'use strict';

var moment = require('moment');
var React = require('react');

var Time = React.createClass({

  render() {
    /* jshint eqnull:true */
    var {value, relative, format, ...props} = this.props;

    if (!moment.isMoment(value)) {
      value = moment(value);
    }

    var machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ');

    if (relative || format) {
      var humanReadable = relative ? value.fromNow() : value.format(format);
      return (
        <time {...props} dateTime={machineReadable}>
          {humanReadable}
        </time>
      );
    } else {
      return <time {...props}>{machineReadable}</time>;
    }
  }
});

module.exports = Time;
