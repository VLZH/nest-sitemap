import { DynamicModule, Global, Module } from "@nestjs/common";
import { SitemapModuleAsyncOptions, SitemapModuleOptions } from "./interfaces";
import { SitemapService } from "./sitemap.service";

@Global()
@Module({})
export class SitemapModule {
    public static forRoot(options: SitemapModuleOptions): DynamicModule {
        return {
            module: SitemapModule,
            providers: [
                {
                    provide: "SITEMAP_MODULE_OPTIONS",
                    useValue: options
                },
                SitemapService
            ],
            exports: [SitemapService]
        };
    }
    public static forRootAsync(
        options: SitemapModuleAsyncOptions
    ): DynamicModule {
        return {
            module: SitemapModule,
            providers: [
                {
                    provide: "SITEMAP_MODULE_OPTIONS",
                    useFactory: options.useFactory,
                    inject: options.inject || []
                },
                SitemapService
            ],
            imports: options.imports || [],
            exports: [SitemapService]
        };
    }
}
