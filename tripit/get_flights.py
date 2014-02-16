#!/usr/bin/env python

import sys

import tripit

def main():
  if len(argv) < 5:
    print "Usage: get_flights.py consumer_key consumer_secret authorized_token authorized_token_secret"
    return 1
    
  api_url = 'https://api.tripit.com'
  consumer_key = argv[1]
  consumer_secret = argv[2]
  authorized_token = argv[3]
  authorized_token_secret = argv[4]

  oauth_credential = tripit.OAuthConsumerCredential(consumer_key, consumer_secret, authorized_token, authorized_token_secret)
  t = tripit.TripIt(oauth_credential, api_url = api_url)

  trips = t.list_trip()
  for trip_id in [trip['id'] for trip in trips['Trip']]:
  	flights = t.list_object(filter={'id': trip_id, 'type':'air'})
  	for segments in [air_object['Segment'] if isinstance(air_object['Segment'], list) else [air_object['Segment']] for air_object in flights['AirObject']]:
  		for segment in segments:
	  		print segment['marketing_airline_code'], segment['marketing_flight_number']

if __name__ == '__main__':
	sys.exit(main(sys.argv[1:]))