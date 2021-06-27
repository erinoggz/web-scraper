import {Injectable} from '@nestjs/common';
import {config} from '../config/config';
import * as redisClient from 'ioredis';

@Injectable()
export class RedisInit {
    private static readConnection;
    private static writeConnection;

    read() {
        if (!RedisInit.readConnection) {
            let readOptions: object = {
                host: config.redis.read.host,
                port: config.redis.read.port,
                db: config.redis.read.db
            }
            RedisInit.readConnection = new redisClient(readOptions);    
        }
        return RedisInit.readConnection;
    }

    write() {
        if (!RedisInit.writeConnection) {
            let writeOptions: object = {
                host: config.redis.host,
                port: config.redis.port,
                db: config.redis.db
            }
            RedisInit.writeConnection = new redisClient(writeOptions);    
        }
        return RedisInit.writeConnection;
    }
}