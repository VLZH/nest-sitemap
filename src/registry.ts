import { SitemapSource } from "./interfaces";
import { SitemapItem } from "./item";

export class SourcesRegistry {
    private sources: SitemapSource[] = [];
    public addSource(s: SitemapSource): void {
        this.sources.push(s);
    }
    public getSources(): SitemapSource[] {
        return this.sources;
    }
    public async getItems(): Promise<SitemapItem[]> {
        const gettingPromises: Array<Promise<SitemapItem[]>> = [];
        this.sources.forEach(source => {
            const itemsOrPromise = source.getItems();
            if (itemsOrPromise instanceof Promise) {
                gettingPromises.push(itemsOrPromise);
            } else {
                gettingPromises.push(Promise.resolve(itemsOrPromise));
            }
        });
        const batches = await Promise.all(gettingPromises);
        const result = batches.reduce((acc, cur) => {
            return [...acc, ...cur];
        }, []);
        return result;
    }
}

export const registry = new SourcesRegistry();

export const registerSource = (source: SitemapSource): void => {
    registry.addSource(source);
};
