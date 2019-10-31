import { DEFAUL_CHANGEFREQ, DEFAUL_PRIORITY } from "./constances";
export class SitemapItem {
    public url!: string;
    public changefreq?: string;
    public priority?: number;
    public lastmod?: string;
    constructor(args: Omit<SitemapItem, "constructor">) {
        this.url = args.url;
        this.changefreq = args.changefreq || DEFAUL_CHANGEFREQ;
        this.priority = args.priority || DEFAUL_PRIORITY;
        this.lastmod = args.lastmod;
    }
}
