#!/usr/bin/env python

import sys

import tripit

def main(argv):
	api_url = 'https://api.tripit.com'
	consumer_key = ''
	consumer_secret = ''

	if len(argv) < 3:
		print 'Usage: get_authorization.py consumer_key consumer_secret'
		return 1
	else:
		consumer_key = argv[0]
		consumer_secret = argv[2]

	oauth_credential = tripit.OAuthConsumerCredential(consumer_key, consumer_secret)
	t = tripit.TripIt(oauth_credential, api_url=api_url)
	request_token = t.get_request_token()

	print 'Go to https://www.tripit.com/oauth/authorize?oauth_token=%s&oauth_callback=http%3A%2F%2Fwww.tripit.com%2Fhome' % request_token['oauth_token']
	raw_input 'Press enter when done'

	oauth_credential = tripit.OAuthConsumerCredential(consumer_key, consumer_secret, request_token['oauth_token'], )
	t = tripit.TripIt(oauth_credential, api_url=api_url)
	access_token = t.get_access_token()

	print consumer_key
	print consumer_secret
	print access_token['oauth_token']
	print access_token['oauth_token_secret']

if __name__ == '__main__':
	sys.exit(main(sys.argv[1:]))