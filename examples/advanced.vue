<template>
    <div class="example">
        <h2>Advanced Lazy Loading Example</h2>
        <div class="image-grid">
            <div v-for="image in images" :key="image.id" class="image-container">
                <img v-lazy="image.url" :alt="image.alt" class="lazy-image">
                <div class="loading-overlay" v-if="!image.loaded">
                    Loading...
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const images = ref([
            { id: 1, url: 'https://example.com/1.jpg', alt: 'Image 1', loaded: false },
            { id: 2, url: 'https://example.com/2.jpg', alt: 'Image 2', loaded: false },
            { id: 3, url: 'https://example.com/3.jpg', alt: 'Image 3', loaded: false }
        ])

        return { images }
    }
})
</script>

<style scoped>
.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.image-container {
    position: relative;
}

.lazy-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy-image.loaded {
    opacity: 1;
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
}
</style>