# Vue 3 Lazy Image Loader

A lightweight Vue 3 plugin for lazy loading images using the Intersection Observer API.

## Installation

```bash
npm install vue3-lazy-image-loader
```

## Usage

1. Register the plugin in your main.js:

```javascript
import { createApp } from "vue";
import VueLazyImage from "vue3-lazy-image-loader";
import App from "./App.vue";

const app = createApp(App);

app.use(VueLazyImage, {
  // Optional configuration
  threshold: 0.5,
  rootMargin: "50px 0px",
  loading: "path/to/loading-image.gif",
  error: "path/to/error-image.gif",
});

app.mount("#app");
```

2. Use in your components:

```vue
<template>
  <img v-lazy="'https://example.com/image.jpg'" alt="Lazy loaded image" />
</template>
```

## Configuration Options

| Option     | Type   | Default    | Description                                         |
| ---------- | ------ | ---------- | --------------------------------------------------- |
| threshold  | Number | 0.5        | Percentage of element visibility to trigger loading |
| rootMargin | String | '50px 0px' | Margin around the root element                      |
| loading    | String | base64 gif | Loading placeholder image                           |
| error      | String | base64 gif | Error placeholder image                             |

## CSS Classes

The plugin adds these CSS classes:

- `.loaded` when the image is successfully loaded
- `.error` when the image fails to load

## License

MIT License
