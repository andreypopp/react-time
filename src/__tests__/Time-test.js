/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 */

import assert         from 'power-assert';
import Time           from '../Time';
import moment         from 'moment';
import React          from 'react';
import ReactDOMServer from 'react-dom/server';

// load "fr" locale for tests
import 'moment/locale/fr';

// set the default locale to "en"
moment.locale('en');

describe('react-time', function() {
  let date = new Date(1987, 4, 8, 5, 0, 0, 0);

  it('renders date', function() {
    let markup = ReactDOMServer.renderToString(<Time value={date} />);
    assert(/1987\-05\-08/.test(markup));
  });

  it('renders date in specified format', function() {
    let markup = ReactDOMServer.renderToString(<Time value={date} format="YYYY YYYY" />);
    assert(/datetime="1987\-05\-08T\d\d:\d\d:\d\d[+-]\d\d:\d\d"/.test(markup));
    assert(/1987 1987/.test(markup));
  });

  it('renders date using relative format', function() {
    let markup = ReactDOMServer.renderToString(<Time value={date} relative />);
    assert(/datetime="1987\-05\-08T\d\d:\d\d:\d\d[+-]\d\d:\d\d"/.test(markup));
    assert(/28 years ago/.test(markup), markup);
  });

  it('renders a title when using relative format', function() {
    let markup = ReactDOMServer.renderToString(<Time value={date} relative />);
    assert(/title="1987\-05\-08 05:00"/.test(markup));
  });

  it('renders the title in specified format', function() {
    let markup = ReactDOMServer.renderToString(<Time value={date} relative titleFormat="YYYY" />);
    assert(/title="1987"/.test(markup));
  });

  it('does not render a title using absolute format', function() {
    let markup = ReactDOMServer.renderToString(<Time value={date} relative titleFormat="YYYY" />);
    assert(/title/.test(markup));
  });

  it('accepts locale prop', function() {
    let markup = ReactDOMServer.renderToString(<Time value={date} relative locale="fr" />);
    assert(/datetime="1987\-05\-08T05:00:00[+-]\d\d:\d\d"/.test(markup));
    assert(/il y a 28 ans/.test(markup), markup);
  });

  it('transfers props down to DOM element', function() {
    let markup = ReactDOMServer.renderToString(<Time value={date} relative className="className" />);
    assert(/28 years ago/.test(markup), markup);
    assert(/class="className"/.test(markup));
  });

  it('allows passing milliseconds from epoch', function() {
    let markup = ReactDOMServer.renderToString(<Time value={1} />);
    assert(/1970\-01\-01/.test(markup));
  });

  it('allows passing string', function() {
    let markup = ReactDOMServer.renderToString(<Time value="1970-01-01" />);
    assert(/1970\-01\-01/.test(markup));
  });

  it('allows passing string with custom format', function() {
    let markup = ReactDOMServer.renderToString(<Time value="1970/01/01" valueFormat="YYYY/mm/DD" />);
    assert(/1970\-01\-01/.test(markup));
  });

  it('allows passing moment instance', function() {
    let markup = ReactDOMServer.renderToString(<Time value={moment('1970-01-01')} />);
    assert(/1970\-01\-01/.test(markup));
  });

  it('does not render current date if value is falsy', function() {
    let markup = ReactDOMServer.renderToString(<Time />);
    assert(/Invalid date/.test(markup));
  });
});
