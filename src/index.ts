import type { App, Plugin, DirectiveBinding } from 'vue';
import type { LazyImageOptions } from './types';
import { createLoadingStyles } from './styles';

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
        skeletonColor: '#e5e7eb',
      },
      errorStyle: {
        backgroundColor: '#fef2f2',
        borderColor: '#dc2626',
        textColor: '#dc2626',
      },
      transition: {
        duration: '0.3s',
        timing: 'ease-in-out',
      },
      placeholderContent: '',
      onLoad: undefined,
      onError: undefined,
    };

    const finalOptions: LazyImageOptions = { ...defaultOptions, ...options };

    // Inject global styles
    if (typeof window !== 'undefined' && !document.querySelector('#vue-lazy-image-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'vue-lazy-image-styles';
      styleEl.innerHTML = createLoadingStyles(finalOptions);
      document.head.appendChild(styleEl);
    }

    app.directive('lazy', {
      // mounted(el: HTMLImageElement, binding: DirectiveBinding<string>) {
      //   const imageUrl = binding.value;
      //   if (!imageUrl) return;

      //   const wrapper = document.createElement('div');
      //   wrapper.className = 'vue-lazy-image-wrapper';

      //   const parent = el.parentNode;
      //   if (!parent) {
      //     console.warn('[VueLazyImage] Element has no parent node:', el);
      //     return;
      //   }

      //   parent.insertBefore(wrapper, el);
      //   wrapper.appendChild(el);

      //   el.classList.add('vue-lazy-image', 'loading');
      //   wrapper.classList.add('loading-wrapper');

      //   const placeholder = document.createElement('div');
      //   placeholder.className = 'vue-lazy-image-placeholder';
      //   placeholder.innerHTML = finalOptions.placeholderContent || '';
      //   wrapper.appendChild(placeholder);

      //   el.style.opacity = '0';
      //   el.src = finalOptions.loading!;

      //   const observer = new IntersectionObserver(
      //     (entries) => {
      //       entries.forEach((entry) => {
      //         if (entry.isIntersecting) {
      //           const img = new Image();
      //           img.onload = () => {
      //             el.src = imageUrl;
      //             el.style.opacity = '1';
      //             el.classList.remove('loading');
      //             el.classList.add('loaded');
      //             wrapper.classList.remove('loading-wrapper');
      //             placeholder.remove();

      //             if (finalOptions.onLoad) {
      //               finalOptions.onLoad(el, imageUrl);
      //             }
      //           };
      //           img.onerror = () => {
      //             el.src = finalOptions.error!;
      //             el.style.opacity = '1'; // Ensure visibility for error state
      //             el.classList.remove('loading');
      //             el.classList.add('error');
      //             wrapper.classList.remove('loading-wrapper');
      //             placeholder.remove();

      //             if (finalOptions.onError) {
      //               finalOptions.onError(el, imageUrl);
      //             }
      //           };
      //           img.src = imageUrl;
      //           observer.unobserve(el);
      //         }
      //       });
      //     },
      //     {
      //       threshold: finalOptions.threshold,
      //       rootMargin: finalOptions.rootMargin,
      //     }
      //   );

      //   observer.observe(el);

      //   // Clean up observer on unmount
      //   (el as any).__vueLazyImageObserver__ = observer;
      // },
      mounted(el: HTMLImageElement, binding: DirectiveBinding<{ src: string; onLoad?: Function; onError?: Function }>) {
        const { src, onLoad, onError } = binding.value;

        if (!src) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'vue-lazy-image-wrapper';

        const parent = el.parentNode;
        if (!parent) {
          console.warn('[VueLazyImage] Element has no parent node.');
          return;
        }

        parent.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        el.classList.add('vue-lazy-image', 'loading');
        wrapper.classList.add('loading-wrapper');

        const placeholder = document.createElement('div');
        placeholder.className = 'vue-lazy-image-placeholder';
        wrapper.appendChild(placeholder);

        el.style.opacity = '0';
        el.src = finalOptions.loading!;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = new Image();
                img.onload = () => {
                  el.src = src;
                  el.style.opacity = '1';
                  el.classList.remove('loading');
                  el.classList.add('loaded');
                  wrapper.classList.remove('loading-wrapper');
                  placeholder.remove();

                  // Call the onLoad callback if provided
                  if (onLoad) onLoad(el, src);
                };

                img.onerror = () => {
                  el.src = finalOptions.error!;
                  el.style.opacity = '1'; // Ensure the image is visible in the error state
                  el.classList.remove('loading');
                  el.classList.add('error');
                  wrapper.classList.remove('loading-wrapper');
                  placeholder.remove();

                  // Call the onError callback if provided
                  if (onError) onError(el, src);
                };

                img.src = src;
                observer.unobserve(el);
              }
            });
          },
          {
            threshold: finalOptions.threshold,
            rootMargin: finalOptions.rootMargin,
          }
        );

        observer.observe(el);

        // Clean up observer on unmount
        (el as any).__vueLazyImageObserver__ = observer;
      },

      unmounted(el: HTMLImageElement) {
        const observer = (el as any).__vueLazyImageObserver__;
        if (observer) {
          observer.unobserve(el);
          observer.disconnect();
          delete (el as any).__vueLazyImageObserver__;
        }
      },
    });
  },
};

export default VueLazyImage;
