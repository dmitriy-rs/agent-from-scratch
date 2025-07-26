<script setup lang="ts">
const { experimentName } = defineProps<{
    experimentName: string;
}>();

async function runEval() {
    return $fetch(`/api/eval/${experimentName}`, {
        async onResponse() {
            await refreshNuxtData('/api/results');
        },
    });
}
</script>

<template>
    <BaseButton class="w-32" @click="runEval">Run eval</BaseButton>
</template>
