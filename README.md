# How to use

Register module:
```typescript
import { SitemapModule } from 'nest-sitemap';

@Module({
    // ...
    imports: [
        SitemapModule.forRootAsync({
            imports: [UtilsModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    hostname: configService.get('MEDIA_ORIGIN'),
                };
            },
        }),
    ]
    // ...
})
export class AppModule {}
```

Apply decorator to typeorm entity:
```typescript
import { TypeormSitemapResource } from 'nest-sitemap';

@TypeormSitemapResource({
    getUrl: page => {
        return `/ru/article/${(page as ArticleEntity).slug}`;
    },
})
@Entity({
    name: 'articles',
})
export class ArticleEntity extends BaseSeoEntity {
    @Column()
    public title: string;
}
```

Access to sitemap xml from some controller:
```typescript
@Controller()
export class MainController {
    public constructor(private readonly sitemap_service: SitemapService) {}
    
    @Header('Content-Type', 'application/xml')
    @Get('sitemap')
    public getSitemap() {
        return this.sitemap_service.getSitemapXml();
    }
}
```

If you want to add additional items to registry you can to do like this:
```typescript
import { registerSource, SitemapItem } from 'nest-sitemap';

registerSource({
    getItems() {
        return [
            new SitemapItem({
                url: '/my_superpage',
            }),
        ];
    },
});

```
