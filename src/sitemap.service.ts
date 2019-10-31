import { Inject, Injectable } from "@nestjs/common";
import { SitemapModuleOptions } from "./interfaces";
import { registry } from "./registry";
import { SitemapStream, streamToPromise } from "sitemap";

@Injectable()
export class SitemapService {
    constructor(
        @Inject("SITEMAP_MODULE_OPTIONS")
        private readonly config: SitemapModuleOptions
    ) {}

    async getSitemapXml(): Promise<string> {
        const items = await registry.getItems();
        const sitemapStream = new SitemapStream({
            hostname: this.config.hostname
        });
        items.forEach(item => {
            sitemapStream.write({
                url: item.url,
                changefreq: item.changefreq,
                priority: item.priority,
                lastmod: item.lastmod
            });
        });
        sitemapStream.end();
        const bf = await streamToPromise(sitemapStream);
        return bf.toString();
    }
}
