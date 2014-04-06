#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Protractor tests"
echo $BASE_DIR
echo "-------------------------------------------------------------------"

protractor $BASE_DIR/../assets/js/test/protractor.conf.js $*

