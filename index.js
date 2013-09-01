/**
 * @jsx React.DOM
 */

var datetime = require('datetime');
var React = require('react-tools/build/modules/React');

module.exports = React.createClass({
  render: function() {
    var value = this.props.value,
        machineReadable,
        humanReadable,
        formatter;

    if (Object.prototype.toString.call(value) == '[object String]') {
      value = new Date(value);
    }

    machineReadable = datetime.format(value, "%Y-%m-%dT%H:%M:%S");

    if (this.props.relative || this.props.format) {
      formatter = this.props.relative ? datetime.formatAgo : datetime.format;
      humanReadable = formatter(value, this.props.format);
      return this.transferPropsTo(React.DOM.time(
          {datetime: machineReadable},
          [humanReadable]));
    } else {
      return this.transferPropsTo(React.DOM.time(
          null,
          [machineReadable]));
    }
  }
});
