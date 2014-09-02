var assert = require('assert');
var Timestamp = require('./index');
var React = require('react');

describe('react-time', function() {
  var date = new Date(1987, 4, 8, 5, 0, 0, 0);

  it('renders date', function() {
    var c = Timestamp({value: date});
    var markup = React.renderComponentToString(c);
    assert(/1987\-05\-08/.test(markup));
  });

  it('renders date in specified format', function() {
    var c = Timestamp({value: date, format: "YYYY YYYY"});
    var markup = React.renderComponentToString(c);
    assert(/datetime="1987\-05\-08T05:00:00[+-]\d\d:\d\d"/.test(markup));
    assert(/1987 1987/.test(markup));
  });

  it('renders date using relative format', function() {
    var c = Timestamp({value: date, relative: true});
    var markup = React.renderComponentToString(c);
    assert(/datetime="1987\-05\-08T05:00:00[+-]\d\d:\d\d"/.test(markup));
    assert(/27 years ago/.test(markup));
  });

  it('transfers props down to DOM element', function() {
    var c = Timestamp({value: date, relative: true, className: 'className'});
    var markup = React.renderComponentToString(c);
    assert(/27 years ago/.test(markup));
    assert(/class="className"/.test(markup));
  });

  it('allows passing milliseconds from epoch', function() {
    var c = Timestamp({value: 1});
    var markup = React.renderComponentToString(c);
    assert(/1970\-01\-01/.test(markup));
  });

  it('allows passing string', function() {
    var c = Timestamp({value: '1970-01-01'});
    var markup = React.renderComponentToString(c);
    assert(/1970\-01\-01/.test(markup));
  });
});
