import { config } from '../config/config';
import { RedisInit } from './redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisCache {
    constructor(private readonly redisClient: RedisInit) {
    }

    /**
     * Retrieves the cached value for a given key.
     * @param  {string} key The cache key.
     * @return {object} The cached value, else false.
     */
    get(key) {
        return this.redisClient.read().get(key).then(data => {
            return (data) ? JSON.parse(data) : '';
        })
    }

    /**
     * Caches a value under the specified key for the given ttl
     * @param {string} key   The key under which to cache the value
     * @param {object} value The value that needs to be cached
     * @param {integer} ttl  The ttl for the cached value
     */
    set(key, value, ttl) {
        if (ttl) {
            ttl = parseInt(ttl);
            this.redisClient.write().set(key, JSON.stringify(value), 'ex', ttl);
        } else {
            this.redisClient.write().set(key, JSON.stringify(value));
        }
    }

    delete(key) {
        this.redisClient.write().del(key)
    }
}