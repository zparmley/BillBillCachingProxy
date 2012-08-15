# BillBill - An extremely simple caching proxy
## Doesn't yet work...

BillBill should sit between the world and a website.  With some basic rules it should cache pages requested and server them up all fast like until the cache expires. A simple config should determine which domains should be proxied, cached or passed through, and TTLs.

## Raison
+ I'm learning things
+ I understand this is ridiculous, but - I am rolling out a page on a small personal project soon that invokes a rather slow 3rd party API.  Instead of writing an invoking a memcached modules for the crappy CMS it's written in, I'm doing this, because I find it more interesting.
+ I want to learn more node.
+ I know solutions already exist, but hell, with time and iterations I don't see why I can't offer something better.

## Fresh slate
Originally I was getting kind of complicated, and trying to learn a lot of new things at once.  I was using Alfred, and thinking of writing a model layer that allowed requests to be streamed into a particular field of an Alfred model for cache storage.  It was all getting a bit overburdened and cumbersome.

So, I was listening to NodeUP on a trip recently and heard about the [filed](https://github.com/mikeal/filed) module.  I decided I should use it's lovely request/response streaming capabilities to focus on getting a core project done, and enhance to something more complicated later should the need arise.

## Currently
Very simple, and not complete at all

Can serve up multiple domains.

Using files to house the caches

Configs are simple - configure a domain name, origin, ttl and list of 'excludes' routes which mapleTree can match.

I'm going to consider round one complete with in-memory indexes, meaning that if the server goes down, the caches will have to all be cleared.

## Maybe baby
I'd like to see the cache store be something distributed, maybe memcached, so that if the scale of cached pages grows rapidly, it will be pretty simple to increase storage and make it accessible to multiple BillBill servers.

I'd like the indexes to persist somewhere, so that a rebooting BillBill server will not mean lost caches.  This is essential if I want to be able to fire up on multiple servers.