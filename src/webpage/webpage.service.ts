import { Injectable } from '@nestjs/common';
import { NestCrawlerService } from 'nest-crawler';
import { WebPageType } from './webpage.type';


@Injectable()
export class WebpageService {
    constructor(private readonly crawler: NestCrawlerService){}

    async parseWebPageUrl(url: string): Promise<WebPageType>{
          const data: WebPageType = await this.crawler.fetch({
            target: url,
            fetch: {
              title: 'head title',
              description: {
                selector: 'meta[name="description"]',
                attr: 'content',
              },
              image:
              {
                selector: 'meta[property="og:image"]',
                attr: 'content',
              }
            },
          });
        return data
    }
}
