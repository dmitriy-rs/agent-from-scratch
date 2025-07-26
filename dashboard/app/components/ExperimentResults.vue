<script setup lang="ts">
import ExperimentGraph from '../components/ExperimentGraph.vue';
import type { Experiment } from '../../../evals/types';

const { results } = defineProps<{
    results: Experiment[];
}>();

const selectedExperiment = ref(results[0]?.name);

const currentExperiment = computed(() => {
    const experiment = results.find(
        (exp) => exp.name === selectedExperiment.value,
    );
    return experiment
        ? ({
              ...experiment,
              sets: experiment.sets.slice(-10),
          } satisfies Experiment)
        : null;
});
</script>

<template>
    <div>
        <div className="controls">
            <label htmlFor="experiment-select">Select Experiment: </label>

            <select id="experiment-select" v-model="selectedExperiment">
                <option
                    v-for="exp in results"
                    :key="exp.name"
                    :value="exp.name"
                >
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

<style scoped>
.controls {
    margin: 2rem 0;
}

select {
    margin-left: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
}
</style>
