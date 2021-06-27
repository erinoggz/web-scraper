import { Module, CacheModule } from '@nestjs/common';
import { WebpageModule } from './webpage/webpage.module';
import { GraphQLModule } from '@nestjs/graphql';
import { NestCrawlerModule } from 'nest-crawler';
import { RedisModule} from 'nestjs-redis'
import * as redisStore from 'cache-manager-redis-store';
import { config } from 'config/config';


@Module({
  imports: [GraphQLModule.forRoot({ autoSchemaFile: true }), 
    WebpageModule, 
    NestCrawlerModule, CacheModule.register({
        store: redisStore,
        host: config.redis.host,
        port: config.redis.port,
        database: config.redis.db,
        ttl: 172800,
        max: 300000,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
