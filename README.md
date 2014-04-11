# NOLA Crime Heatmap

## Overview

This is an interactive heatmap for viewing New Orleans crime data.

## Setup

Make sure you have Ruby and a Java runtime installed(the latter for YUI compressor, which the asset pipeline is configured to use). You'll also need node.js for running frontend tests.

Install gems:

```
bundle install
```

Install [Karma](http://karma-runner.github.io/) and [Protractor](https://github.com/angular/protractor) for frontend testing:

```
npm install -g karma
npm install -g protractor
```

Install and run [Bower](http://bower.io/) for local dev packages:

```
npm install -g bower
bower install
```

Run the application:

```
bundle exec rackup
```

## Frontend Testing

Run Karma(watch) for unit tests:

```
sh scripts/ng_unit.sh
```

Run Protractor for end-to-end tests:

```
webdriver-manager start
sh scripts/ng_e2e.sh
```

## Data Source

Scraped data from here: http://spotcrime.com/la/new+orleans

## License

[MIT](http://opensource.org/licenses/MIT)

![In the Heat of the Night](README-heat.jpg)
