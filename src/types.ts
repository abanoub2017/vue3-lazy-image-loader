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
        borderColor?: string;
        textColor?: string;
    };
    transition?: {
        duration?: string;
        timing?: string;
    };
    placeholderContent?: string; // Custom placeholder content
    onLoad?: (el: HTMLImageElement, src: string) => void; // Hook for successful load
    onError?: (el: HTMLImageElement, src: string) => void; // Hook for errors

}

declare module 'vue' {
    interface ComponentCustomProperties {
        $lazyImage: Plugin
    }
}

export { }