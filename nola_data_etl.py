import pyproj
import json
import csv
import urllib2
import StringIO
from geojson import Point, Feature, FeatureCollection
from categories import CATEGORIES

SOUTH_LA = pyproj.Proj(init='epsg:3452')
WGS84 = pyproj.Proj('+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs')
TO_METER = 0.3048006096012192

def convert_to_wgs84(coords):
    return pyproj.transform(SOUTH_LA, WGS84, coords[0], coords[1])

def category_groups(row):
    typ = row['TypeText']
    return [k for k, v in CATEGORIES.iteritems() if typ in v]

def row_to_geojson_feature(row):
    coords = map(lambda c: float(row[c]) * TO_METER, ['MapX', 'MapY'])
    geom = Point(coordinates=convert_to_wgs84(coords))
    row['Categories'] = category_groups(row)

    # just stick whole row on properties
    return Feature(geometry=geom, properties=row)

if __name__ == '__main__':

    print "==== Fetch data from data.nola.gov and parse CSV"

    # Fetch CSV from data.nola.gov
    response = urllib2.urlopen('https://data.nola.gov/api/views/w68y-xmk6/rows.csv?accessType=DOWNLOAD')

    # Parse the csv file in memory
    csv_reader = csv.DictReader(StringIO.StringIO(response.read()))

    print "==== Build Features"

    features = []
    for row in csv_reader:
        features.append(row_to_geojson_feature(row))

    print "==== Built %d Features" % len(features)

    # Get unqiue crime types
    types = sorted(list(set(map(lambda f: f['properties']['TypeText'],
        features))))

    collection = FeatureCollection(features, metadata={ 'types': types })

    print "==== Write to data/calls-for-service_2015.geojson"

    with open('data/calls-for-service_2015.geojson', 'w') as f:
        f.write(repr(collection))


