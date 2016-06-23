/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import moment from 'moment';
import React, {PropTypes} from 'react';

export default class Time extends React.Component {

  static propTypes = {

    /**
     * Value.
     */
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(moment.fn.constructor),
      PropTypes.instanceOf(Date),
      PropTypes.number,
      PropTypes.string
    ]).isRequired,

    /**
     * If component should output the relative time difference between now and
     * passed value.
     */
    relative: PropTypes.bool,

    /**
     * If set to true will use the utc mode from moment and display all dates
     * in utc disregarding the users locale
     */
    utc: PropTypes.bool,

    /**
     * Datetime format which is used to output date to DOM.
     */
    format: PropTypes.string,

    /**
     * Datetime format which is used to parse value if it's being a string.
     */
    valueFormat: PropTypes.string,

    /**
     * Datetime format which is used to set title attribute on relative or
     * formatted dates.
     */
    titleFormat: PropTypes.string,

    /**
     * Locale.
     */
    locale: PropTypes.string,

    /**
     * Component to use.
     */
    Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };


  static defaultProps = {
    titleFormat: 'YYYY-MM-DD HH:mm',
    Component: 'time'
  };

  render() {
    let {
      value, locale, relative, utc,
      format, valueFormat, titleFormat,
      Component, ...props
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

    if (utc) {
      value = value.utc();
    }

    let machineReadable = value.format('YYYY-MM-DDTHH:mm:ssZ');

    if (relative || format) {
      let humanReadable = relative ? value.fromNow() : value.format(format);
      return (
        <Component
          title={relative ? value.format(titleFormat) : null}
          {...props}
          dateTime={machineReadable}>
          {humanReadable}
        </Component>
      );
    } else {
      return <time {...props}>{machineReadable}</time>;
    }
  }
}
