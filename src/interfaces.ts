import { ModuleMetadata } from "@nestjs/common/interfaces";
import { SitemapItem } from "./item";

export type LastModExecutor = (item: any) => string;
export type PriorityExecutor = (item: any) => number;
export type ChangefreqExecutor = (item: any) => string;

export interface SitemapSource {
    getItems: () => SitemapItem[] | Promise<SitemapItem[]>;
    getLastMod?: LastModExecutor;
    getPriority?: PriorityExecutor;
    getChangefreq?: ChangefreqExecutor;
}

export interface SitemapModuleOptions {
    hostname: string;
}

export interface SitemapModuleAsyncOptions
    extends Pick<ModuleMetadata, "imports"> {
    useFactory: (
        ...args: any[]
    ) => Promise<SitemapModuleOptions> | SitemapModuleOptions;
    inject: any[];
}
