# Vue 3 Lazy Image Loader

A lightweight Vue 3 plugin for lazy loading images using the Intersection Observer API.

## Installation

```bash
npm install vue3-lazy-image-loader
```

## Usage

### 1. Register the plugin in your `main.js`:

```javascript
import { createApp } from "vue";
import VueLazyImage from "vue3-lazy-image-loader";
import App from "./App.vue";

const app = createApp(App);

app.use(VueLazyImage, {
  // Optional configuration
  threshold: 0.5, // Percentage of visibility to trigger loading
  rootMargin: "50px 0px", // Margin around the root element
  loading: "path/to/loading-image.gif", // Placeholder image during loading
  error: "path/to/error-image.gif", // Placeholder image on error
  loadingStyle: {
    animation: "pulse", // Animation effect for loading state
    backgroundColor: "#f3f4f6", // Background color for loading state
    blur: true, // Blur effect during loading
    skeletonColor: "#e5e7eb", // Skeleton color for loading placeholder
  },
  errorStyle: {
    backgroundColor: "#fef2f2", // Background color for error placeholder
    borderColor: "#dc2626", // Border color for error placeholder
    textColor: "#dc2626", // Text color for error placeholder
  },
  transition: {
    duration: "0.3s", // Duration of fade-in transition
    timing: "ease-in-out", // Timing function for transition
  },
  placeholderContent: "<div>Loading...</div>", // HTML content during loading
  onLoad: (el, src) => console.log("Image loaded:", src), // Callback for successful load
  onError: (el, src) => console.error("Image failed to load:", src), // Callback for load error
});

app.mount("#app");
```

### 2. Use in your components

```vue
<template>
  <div>
    <!-- Basic usage -->
    <img v-lazy="'https://example.com/image.jpg'" alt="Lazy loaded image" />

    <!-- Example with error handling -->
    <img v-lazy="'https://invalid-url.com/image.jpg'" alt="Error image" />
  </div>
</template>
```

## Configuration Options

| Option             | Type     | Default                                                                                    | Description                                         |
| ------------------ | -------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| threshold          | Number   | 0.5                                                                                        | Percentage of element visibility to trigger loading |
| rootMargin         | String   | '50px 0px'                                                                                 | Margin around the root element                      |
| loading            | String   | Base64 gif                                                                                 | Loading placeholder image                           |
| error              | String   | Base64 gif                                                                                 | Error placeholder image                             |
| loadingStyle       | Object   | `{ animation: 'pulse', backgroundColor: '#f3f4f6', blur: true, skeletonColor: '#e5e7eb' }` | Styles for the loading placeholder                  |
| errorStyle         | Object   | `{ backgroundColor: '#fef2f2', borderColor: '#dc2626', textColor: '#dc2626' }`             | Styles for the error placeholder                    |
| transition         | Object   | `{ duration: '0.3s', timing: 'ease-in-out' }`                                              | Fade-in transition configuration                    |
| placeholderContent | String   | `""`                                                                                       | HTML content to show while loading                  |
| onLoad             | Function | `undefined`                                                                                | Callback when the image is successfully loaded      |
| onError            | Function | `undefined`                                                                                | Callback when the image fails to load               |

## CSS Classes

The plugin adds these CSS classes:

- `.loaded` when the image is successfully loaded.
- `.error` when the image fails to load.

## License

MIT License
