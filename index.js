'use strict';

var moment = require('moment');
var React = require('react');

var Time = React.createClass({

  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(moment.fn.constructor),
      React.PropTypes.instanceOf(Date),
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    relative: React.PropTypes.bool,
    format: React.PropTypes.string,
    locale: React.PropTypes.string
  },

  render() {
    /* jshint eqnull:true */
    var {value, relative, format, locale, ...props} = this.props;

    if (!moment.isMoment(value)) {
      value = moment(value).locale(locale);
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
  },

  getDefaultProps() {
    return {
      locale: 'en'
    };
  }
});

module.exports = Time;
