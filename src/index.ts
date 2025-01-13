import type { App, Plugin } from 'vue'
import type { LazyImageOptions } from './types'
import { createLoadingStyles } from './styles'

export const VueLazyImage: Plugin = {
  install: (app: App, options: LazyImageOptions = {}) => {
    const defaultOptions: LazyImageOptions = {
      threshold: 0.5,
      rootMargin: '50px 0px',
      loading: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      error: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      loadingStyle: {
        animation: 'pulse',
        backgroundColor: '#f3f4f6',
        blur: true,
        skeletonColor: '#e5e7eb'
      },
      transition: {
        duration: '0.3s',
        timing: 'ease-in-out'
      }
    }

    const finalOptions: LazyImageOptions = { ...defaultOptions, ...options }

    // Inject global styles
    if (!document.querySelector('#vue-lazy-image-styles')) {
      const styleEl = document.createElement('style')
      styleEl.id = 'vue-lazy-image-styles'
      styleEl.innerHTML = createLoadingStyles(finalOptions)
      document.head.appendChild(styleEl)
    }

    app.directive('lazy', {
      mounted: (el: HTMLImageElement, binding) => {
        const imageUrl = binding.value

        // Create wrapper if not exists
        const wrapper = document.createElement('div')
        wrapper.className = 'vue-lazy-image-wrapper'
        el.parentNode?.insertBefore(wrapper, el)
        wrapper.appendChild(el)

        // Set initial state
        el.classList.add('vue-lazy-image', 'loading')
        wrapper.classList.add('loading-wrapper')

        // Create and set placeholder
        const placeholder = document.createElement('div')
        placeholder.className = 'vue-lazy-image-placeholder'
        wrapper.appendChild(placeholder)

        // Set loading state visuals
        el.style.opacity = '0'
        el.src = finalOptions.loading!

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = new Image()

              img.onload = () => {
                el.src = imageUrl
                el.style.opacity = '1'
                el.classList.remove('loading')
                el.classList.add('loaded')
                wrapper.classList.remove('loading-wrapper')
                if (placeholder.parentNode) {
                  placeholder.parentNode.removeChild(placeholder)
                }
              }

              img.onerror = () => {
                el.src = finalOptions.error!
                el.classList.remove('loading')
                el.classList.add('error')
                wrapper.classList.remove('loading-wrapper')
                if (placeholder.parentNode) {
                  placeholder.parentNode.removeChild(placeholder)
                }
              }

              img.src = imageUrl
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