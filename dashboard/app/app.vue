<script setup lang="ts">
import ExperimentGraph from '../components/ExperimentGraph.vue'
import results from '../../evals/results.json';
import type { Experiment } from '../../evals/types';

const selectedExperiment = ref(results.experiments[0]?.name);

const currentExperiment = computed(() => {
    const experiment = results.experiments.find(
        (exp) => exp.name === selectedExperiment.value,
    );
    return experiment
        ? {
              ...experiment,
              sets: experiment.sets.slice(-10),
          } satisfies Experiment
        : null;
});
</script>

<template>
    <div className="app">
        <h1>Experiment Results Viewer</h1>

        <div className="controls">
            <label htmlFor="experiment-select">Select Experiment: </label>

            <select id="experiment-select" v-model="selectedExperiment">
                <option v-for="exp in results.experiments" :key="exp.name" :value="exp.name">
                    {{ exp.name }}
                </option>
            </select>
        </div>

        <ExperimentGraph
            v-if="currentExperiment"
            :experiment="currentExperiment"
        />
    </div>
</template>

<style>
.app {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.controls {
    margin: 2rem 0;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

select {
    margin-left: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
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
    display: flex;
    place-items: center;
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
