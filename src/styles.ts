import type { LazyImageOptions } from './types';

export const createLoadingStyles = (options: LazyImageOptions): string => `
  .vue-lazy-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .vue-lazy-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity ${options.transition?.duration || '0.3s'} ${options.transition?.timing || 'ease-in-out'};
    z-index: 1;
    position: relative;
  }

  .vue-lazy-image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${options.loadingStyle?.backgroundColor || '#f3f4f6'};
    z-index: 0;
  }

  .loading-wrapper .vue-lazy-image-placeholder {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  .error {
    background-color: ${options.errorStyle?.backgroundColor || '#fef2f2'};
    border: 1px solid ${options.errorStyle?.borderColor || '#dc2626'}; /* Optional error border */
    color: ${options.errorStyle?.textColor || '#dc2626'};
        object-fit: contain;
  }
`;
