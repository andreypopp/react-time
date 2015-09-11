/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import moment               from 'moment';
import React, {PropTypes}   from 'react';

export default class Time extends React.Component {

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(moment.fn.constructor),
      PropTypes.instanceOf(Date),
      PropTypes.number,
      PropTypes.string
    ]).isRequired,

    relative: PropTypes.bool,

    format: PropTypes.string,

    /**
     * Datetime format which is used to parse 
     */
    valueFormat: PropTypes.string,

    titleFormat: PropTypes.string,

    locale: PropTypes.string
  };


  static defaultProps = {
    titleFormat: 'YYYY-MM-DD HH:mm'
  };

  render() {
    let {
      value, locale, relative,
      format, valueFormat, titleFormat,
      ...props
    } = this.props;

    if (!value) {
      return <span>Invalid date</span>;
    }

    if (!moment.isMoment(value)) {
      value = moment(value, valueFormat, true);
    }

    if (locale) {
      value = value.locale(locale);
    }

    let machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ');

    if (relative || format) {
      let humanReadable = relative ? value.fromNow() : value.format(format);
      return (
        <time
          {...props}
          dateTime={machineReadable}
          title={relative ? value.format(titleFormat) : null}>
          {humanReadable}
        </time>
      );
    } else {
      return <time {...props}>{machineReadable}</time>;
    }
  }
}
