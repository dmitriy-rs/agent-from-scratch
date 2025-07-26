<script setup lang="ts">
import type { Results } from '../../evals/types'

useHead({
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    title: "Evals Dashboard"
});

const { data: results, pending } = await useFetch<Results>(`/api/results`)
</script>

<template>
    <div className="app">
        <h1>Experiment Results Viewer</h1>

        <ExperimentResults v-if="!pending" :results="results?.experiments || []" />
    </div>
</template>

<style>
.app {
    max-width: 800px;
    padding: 2rem;
}

h1 {
    font-size: 3.2em;
    line-height: 1.1;
}

:root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
}

@media (prefers-color-scheme: light) {
    :root {
        color: #213547;
        background-color: #ffffff;
    }
}
</style>
