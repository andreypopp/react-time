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
    titleFormat: React.PropTypes.string,
    locale: React.PropTypes.string,
    ifValueFalsy: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      titleFormat: 'YYYY-MM-DD HH:mm'
    };
  },
  render() {
    /* jshint eqnull:true */
    var {value, relative, format, locale, titleFormat, ifValueFalsy, ...props} = this.props;

    if (!value) {
      return <span>{ifValueFalsy || 'unknown date'}</span>;
    }

    if (!moment.isMoment(value)) {
      value = moment(value);
    }

    if (locale) {
      value = value.locale(locale);
    }

    var machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ');

    if (relative || format) {
      var humanReadable = relative ? value.fromNow() : value.format(format);
      return (
        <time {...props} dateTime={machineReadable} title={relative ? value.format(titleFormat) : null}>
          {humanReadable}
        </time>
      );
    } else {
      return <time {...props}>{machineReadable}</time>;
    }
  }
});

module.exports = Time;
