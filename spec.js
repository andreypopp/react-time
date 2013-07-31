var assert = require('assert');
var Timestamp = require('./index');
var React = require('react-tools/build/modules/react');

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
});
