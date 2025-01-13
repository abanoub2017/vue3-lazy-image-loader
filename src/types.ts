import { Plugin } from 'vue'

export interface LoadingStyle {
    animation?: string;
    backgroundColor?: string;
    blur?: boolean;
    skeletonColor?: string;
}

export interface LazyImageOptions {
    threshold?: number;
    rootMargin?: string;
    loading?: string;
    error?: string;
    loadingStyle?: LoadingStyle;
    errorStyle?: {
        backgroundColor?: string;
        icon?: boolean;
    };
    transition?: {
        duration?: string;
        timing?: string;
    };
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $lazyImage: Plugin
    }
}

export { }