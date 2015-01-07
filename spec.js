var assert = require('assert');
var Timestamp = require('./src/index');
var moment = require('moment');
var React = require('react');

// load fr locale for tests
require('moment/locale/fr');
// set the default locale to "en"
moment.locale('en');

describe('react-time', function() {
  var date = new Date(1987, 4, 8, 5, 0, 0, 0);

  it('renders date', function() {
    var c = React.createElement(Timestamp, {value: date});
    var markup = React.renderToString(c);
    assert(/1987\-05\-08/.test(markup));
  });

  it('renders date in specified format', function() {
    var c = React.createElement(Timestamp, {value: date, format: "YYYY YYYY"});
    var markup = React.renderToString(c);
    assert(/datetime="1987\-05\-08T05:00:00[+-]\d\d:\d\d"/.test(markup));
    assert(/1987 1987/.test(markup));
  });

  it('renders date using relative format', function() {
    var c = React.createElement(Timestamp, {value: date, relative: true});
    var markup = React.renderToString(c);
    assert(/datetime="1987\-05\-08T05:00:00[+-]\d\d:\d\d"/.test(markup));
    assert(/28 years ago/.test(markup), markup);
  });

  it('accepts locale prop', function() {
    return;
    var c = React.createElement(Timestamp, {value: date, relative: true, locale: 'fr'});
    var markup = React.renderToString(c);
    assert(/datetime="1987\-05\-08T05:00:00[+-]\d\d:\d\d"/.test(markup));
    assert(/il y a 28 ans/.test(markup), markup);
  });

  it('transfers props down to DOM element', function() {
    var c = React.createElement(Timestamp, {value: date, relative: true, className: 'className'});
    var markup = React.renderToString(c);
    assert(/28 years ago/.test(markup), markup);
    assert(/class="className"/.test(markup));
  });

  it('allows passing milliseconds from epoch', function() {
    var c = React.createElement(Timestamp, {value: 1});
    var markup = React.renderToString(c);
    assert(/1970\-01\-01/.test(markup));
  });

  it('allows passing string', function() {
    var c = React.createElement(Timestamp, {value: '1970-01-01'});
    var markup = React.renderToString(c);
    assert(/1970\-01\-01/.test(markup));
  });

  it('allows passing moment instance', function() {
    var c = React.createElement(Timestamp, {value: moment('1970-01-01')});
    var markup = React.renderToString(c);
    assert(/1970\-01\-01/.test(markup));
  });
});
