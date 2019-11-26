# How to use

Add module:
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
