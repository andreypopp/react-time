var assert = require('assert');
var Timestamp = require('./index');
var React = require('react');

describe('react-time', function() {
  var date = new Date('1987-05-08');

  it('renders date', function() {
    React.renderComponentToString(Timestamp({value: date}), function(markup) {
      assert(/1987\-05\-08/.test(markup));
    });
  });

  it('renders date in specified format', function() {
    React.renderComponentToString(Timestamp({value: date, format: "%Y%Y"}), function(markup) {
      assert(/19871987/.test(markup));
    });
  });

  it('renders date using relative format', function() {
    React.renderComponentToString(Timestamp({value: date, relative: true}), function(markup) {
      assert(/May  8th, 1987/.test(markup));
    });
  });
});
