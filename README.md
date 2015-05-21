# NOLA Crime Heatmap

## Overview

This is an interactive heatmap for viewing New Orleans crime data.

## Setup

Make sure you have:
- Ruby
- node.js (for installing frontend packages and running tests)
- Java runtime (for YUI compressor, which the asset pipeline is configured to use)
- Courage and honor

Install gems:

```
bundle install
```

Install [Karma](http://karma-runner.github.io/) and [Protractor](https://github.com/angular/protractor) for frontend testing:

```
npm install -g karma
npm install -g protractor
```

Install and run [Bower](http://bower.io/):

```
npm install -g bower
bower install
```

Fetching and loading new data:

first you need the python requirements:

```
pip install -r requirements.txt
```

Then run the python script to pull and transform current data:

```
python nola_data_etl.py
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
