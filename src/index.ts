import type { App, Plugin } from 'vue'
import type { LazyImageOptions } from './types'

export const VueLazyImage: Plugin = {
  install: (app: App, options: LazyImageOptions = {}) => {
    const defaultOptions: LazyImageOptions = {
      threshold: 0.5,
      rootMargin: '50px 0px',
      loading: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      error: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    }

    const finalOptions: LazyImageOptions = { ...defaultOptions, ...options }

    app.directive('lazy', {
      mounted: (el: HTMLImageElement, binding) => {
        const imageUrl = binding.value

        // Set loading image
        el.src = finalOptions.loading!

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = new Image()
              img.src = imageUrl

              img.onload = () => {
                el.src = imageUrl
                el.classList.add('loaded')
              }

              img.onerror = () => {
                el.src = finalOptions.error!
                el.classList.add('error')
              }

              observer.unobserve(el)
            }
          })
        }, {
          threshold: finalOptions.threshold,
          rootMargin: finalOptions.rootMargin
        })

        observer.observe(el)
      }
    })
  }
}

export default VueLazyImage