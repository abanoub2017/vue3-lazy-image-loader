// src/index.js
export const VueLazyImage = {
  install: (app, options = {}) => {
    // Default options
    const defaultOptions = {
      threshold: 0.5,
      rootMargin: "50px 0px",
      loading:
        "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
      error:
        "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    };

    const finalOptions = { ...defaultOptions, ...options };

    // Create directive
    app.directive("lazy", {
      mounted: (el, binding) => {
        const imageUrl = binding.value;

        // Set loading image
        el.src = finalOptions.loading;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Load the actual image
                const img = new Image();
                img.src = imageUrl;

                img.onload = () => {
                  el.src = imageUrl;
                  el.classList.add("loaded");
                };

                img.onerror = () => {
                  el.src = finalOptions.error;
                  el.classList.add("error");
                };

                // Unobserve after loading
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
      },
    });
  },
};

export default VueLazyImage;
