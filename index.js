"use strict";

var moment = require('moment');
var React = require('react');

var Time = React.createClass({

  displayName: 'Time',

  render: function() {
    var value = this.props.value;

    if (!moment.isMoment(value)) {
      value = moment(value);
    }

    var machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ');

    var props = {};
    for (var k in this.props) {
      if (this.props.hasOwnProperty(k) &&
          k !== 'value' &&
          k !== 'relative' &&
          k !== 'format')
        props[k] = this.props[k];
    }

    if (this.props.relative || this.props.format) {
      var humanReadable = this.props.relative ? value.fromNow() : value.format(this.props.format);
      props.dateTime = machineReadable;
      return React.DOM.time(props, humanReadable);
    } else {
      return React.DOM.time(props, machineReadable);
    }
  }
});

module.exports = Time;
