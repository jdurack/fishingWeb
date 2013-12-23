#!/usr/bin/python

from pprint import pprint
import json
import sys
import urllib2
import boto.rds
from lib.config import config
import MySQLdb

__package__ = "usgs.fetchData"

db = MySQLdb.connect(
    host=config['db']['host']
  , user=config['db']['username']
  , passwd=config['db']['password']
  , db=config['db']['dbName']
)

dbCursor = db.cursor() 


dbCursor.execute("SELECT locationId,usgsSiteId FROM Location WHERE isActive=1;")
usgsSiteIdToLocationId = {}
sites = ''
for row in dbCursor.fetchall():
  locationId = str(row[0])
  usgsSiteId = str(row[1])
  if sites != '':
    sites += ','
  sites += usgsSiteId
  usgsSiteIdToLocationId[usgsSiteId] = locationId

dbCursor.execute("SELECT paramId,usgsParameterCd FROM Param WHERE isActive=1;")
usgsParameterCdToParamId = {}
parameterCds = ''
for row in dbCursor.fetchall():
  paramId = str(row[0])
  usgsParameterCd = str(row[1])
  if parameterCds != '':
    parameterCds += ','
  parameterCds += usgsParameterCd
  usgsParameterCdToParamId[usgsParameterCd] = paramId

def buildURL( baseURL, params ):
  url = baseURL
  first = True
  for paramKey,paramValue in params.iteritems():
    if first:
      url += '?'
    else:
      url += '&'
    url += paramKey + '=' + paramValue
    first = False
  return url

apiParams = {}
apiParams['format'] = config['usgs']['fetchFormat']
#apiParams['siteType'] = 'ST'
apiParams['period'] = config['usgs']['defaultFetchPeriod']
apiParams['parameterCd'] = parameterCds
apiParams['sites'] = sites

url = buildURL( config['usgs']['apiBaseURL'], apiParams )
apiResponse = urllib2.urlopen(url)
apiResponseString = apiResponse.read()
apiResponseJSON = json.loads(apiResponseString)

usgsData = []
timeSeriesSets = apiResponseJSON['value']['timeSeries']
for timeSeriesSet in timeSeriesSets:
  sourceInfo = timeSeriesSet['sourceInfo']
  variable = timeSeriesSet['variable']
  values = timeSeriesSet['values']

  usgsSiteId = sourceInfo['siteCode'][0]['value']
  locationId = usgsSiteIdToLocationId[usgsSiteId]

  usgsParameterCd = variable['variableCode'][0]['value']
  paramId = usgsParameterCdToParamId[usgsParameterCd]

  valueSet = values[0]['value']
  for value in valueSet:
    usgsDatum = {}
    usgsDatum['dateTime'] = value['dateTime']
    usgsDatum['value'] = value['value']
    usgsDatum['locationId'] = locationId
    usgsDatum['paramId'] = paramId
    usgsData.append(usgsDatum)

query = 'INSERT INTO usgsData (dateTime,locationId,paramId,value) VALUES '
first = True
for usgsDatum in usgsData:
  if not first:
    query += ','
  query += '('
  query += '"' + usgsDatum['dateTime'] + '"'
  query += ',' + usgsDatum['locationId']
  query += ',' + usgsDatum['paramId']
  query += ',' + usgsDatum['value']
  query += ')'
  first = False
  break

query += ' ON DUPLICATE KEY UPDATE value=VALUES(value);'

pprint(query)
#dbCursor.execute( query )