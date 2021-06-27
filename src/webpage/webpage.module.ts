import { Logger, Module } from '@nestjs/common';
import { WebPageResolver } from './webpage.resolver';
import { WebpageService } from './webpage.service';
import { NestCrawlerModule, NestCrawlerService } from 'nest-crawler';
import { RedisCache } from 'lib/redis-cache';
import { RedisInit } from 'lib/redis.service';

@Module({
  controllers: [],
  providers: [WebPageResolver,WebpageService,
     NestCrawlerModule, NestCrawlerService, 
     RedisCache, RedisInit, Logger]
})
export class WebpageModule {}
 