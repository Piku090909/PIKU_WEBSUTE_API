import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SiteData {
    bio: string;
    links: Array<SocialLink>;
    contactEmail: string;
}
export interface SocialLink {
    id: string;
    cta: string;
    title: string;
    href: string;
    description: string;
}
export interface backendInterface {
    claimOwnership(): Promise<boolean>;
    getSiteData(): Promise<SiteData>;
    isOwner(): Promise<boolean>;
    setSiteData(data: SiteData): Promise<void>;
}
