'use strict';

const appName: string = 'nestjs-task';

export const config = {
    appName,
    environment: process.env.NODE_ENV,
    redis: {
        host:  process.env.REDIS_HOST,
        port:  process.env.REDIS_PORT,
        db:    process.env.REDIS_DB || 0,
        read: {
            host:  process.env.REDIS_READ_HOST || process.env.REDIS_HOST,
            port:  process.env.REDIS_READ_PORT || process.env.REDIS_PORT,
            db: process.env.REDIS_READ_DB || process.env.REDIS_DB
        }
    },
};
