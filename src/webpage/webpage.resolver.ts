import { Resolver, Query, Args } from '@nestjs/graphql';
import { WebpageService } from './webpage.service';
import { WebPageType } from './webpage.type';
import { RedisCache } from 'lib/redis-cache';
import { Logger } from '@nestjs/common';

@Resolver(of => WebPageType)
export class WebPageResolver {
  constructor(
    private redisCache: RedisCache,
    private webPageService: WebpageService,
  ) {}

  @Query(returns => WebPageType)
  async webpage(@Args('url') url: string) {
    let cacheData = await this.redisCache.get(url);
    if (cacheData) {
      Logger.log('serving from redis')
      return cacheData;
    }

    const result = await this.webPageService.parseWebPageUrl(url);
    await this.redisCache.set(url, result, 100);
    Logger.log('serving from url')
    return result;
  }
}
