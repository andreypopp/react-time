"use strict";

var datetime = require('datetime');
var React = require('react');

function leadingZero(n, leading) {
  return n >= 10 ? n : (leading ? leading : '0')+n;
}

function formatOffset(d) {
  var offset = d.getTimezoneOffset();
  var hour = leadingZero(Math.round(Math.abs(offset / 60)));
  var min = leadingZero(offset % 60);
  return (offset > 0 ? '-' : '+') + hour + ':' + min;
}

var Time = React.createClass({

  displayName: 'Time',

  render: function() {
    var value = this.props.value;

    if (Object.prototype.toString.call(value) == '[object String]') {
      value = new Date(value);
    }

    var machineReadable = datetime.format(value, "%Y-%m-%dT%H:%M:%S");
    // we can use %z formatter instead of formatOffset when
    // https://github.com/joehewitt/datetime/pull/8 is merged
    machineReadable += formatOffset(value);

    var props = {};
    for (var k in this.props) {
      if (this.props.hasOwnProperty(k) &&
          k !== 'value' &&
          k !== 'relative' &&
          k !== 'format')
        props[k] = this.props[k];
    }

    if (this.props.relative || this.props.format) {
      var formatter = this.props.relative ? datetime.formatAgo : datetime.format;
      var humanReadable = formatter(value, this.props.format);
      props.dateTime = machineReadable;
      return React.DOM.time(props, humanReadable);
    } else {
      return React.DOM.time(props, machineReadable);
    }
  }
});

module.exports = Time;
