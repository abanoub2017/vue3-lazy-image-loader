<template>
    <div class="example">
        <h2>Basic Lazy Loading Example</h2>
        <img v-lazy="'https://example.com/image.jpg'" alt="Lazy loaded image" class="lazy-image">
    </div>
</template>

<style scoped>
.lazy-image {
    max-width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy-image.loaded {
    opacity: 1;
}

.lazy-image.error {
    opacity: 0.5;
}
</style>