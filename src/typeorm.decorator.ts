import {
    SitemapSource,
    LastModExecutor,
    PriorityExecutor,
    ChangefreqExecutor
} from "./interfaces";
import { SitemapItem } from "./item";
import { registry } from "./registry";
import { getRepository } from "typeorm";

type UrlExtructor = (item: any) => string | Promise<string>;

export interface TypeormOptions {
    getUrl: UrlExtructor;
    lastModExecutor?: LastModExecutor;
    priorityExecutor?: PriorityExecutor;
    changefreqExecutor?: ChangefreqExecutor;
}

export class TypeormSource implements SitemapSource {
    constructor(
        public entity: Function,
        public getUrlFunc: UrlExtructor,
        public getLastMod?: LastModExecutor,
        public getPriority?: PriorityExecutor,
        public getChangefreq?: ChangefreqExecutor
    ) {}

    async getItems(): Promise<SitemapItem[]> {
        // get repository
        const repo = getRepository(this.entity);
        // get all items
        const findResults = await repo.find();
        // extract urls
        return Promise.all(
            findResults.map(async item => {
                let url = this.getUrlFunc(item);
                if (url instanceof Promise) {
                    url = await url;
                }
                return new SitemapItem({
                    url,
                    changefreq: this.getChangefreq
                        ? this.getChangefreq(item)
                        : undefined,
                    priority: this.getPriority
                        ? this.getPriority(item)
                        : undefined,
                    lastmod: this.getLastMod ? this.getLastMod(item) : undefined
                });
            })
        );
    }
}

export const TypeormSitemapResource = (options: TypeormOptions) => (
    target: Function
): void => {
    registry.addSource(
        new TypeormSource(
            target,
            options.getUrl,
            options.lastModExecutor,
            options.priorityExecutor,
            options.changefreqExecutor
        )
    );
};
