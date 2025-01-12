import { Plugin } from 'vue'

export interface LazyImageOptions {
    threshold?: number
    rootMargin?: string
    loading?: string
    error?: string
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $lazyImage: Plugin
    }
}

export { }