<script setup lang="ts">
import type { Set } from '../../../../evals/types';

defineProps<{
    set: Set;
}>();

function getToolNames(toolCalls: any[]): string {
    if (!toolCalls || toolCalls.length === 0) return 'None';
    return toolCalls
        .map((call) => call.function?.name || call.name || 'Unknown')
        .join(', ');
}
</script>

<template>
    <div class="flex-1 w-full min-h-full">
        <table
            class="w-full border-collapse border border-gray-600 bg-gray-800 text-white"
        >
            <thead>
                <tr class="bg-gray-700">
                    <th
                        class="border border-gray-600 px-4 py-3 text-left text-white"
                    >
                        Input
                    </th>
                    <th
                        class="border border-gray-600 px-4 py-3 text-left text-white"
                    >
                        Tools
                    </th>
                    <th
                        class="border border-gray-600 px-4 py-3 text-left text-white"
                    >
                        Scores
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(run, index) in set.runs"
                    :key="index"
                    class="hover:bg-gray-700"
                >
                    <td class="border border-gray-600 px-4 py-3 text-white">
                        {{ run.input }}
                    </td>
                    <td class="border border-gray-600 px-4 py-3 text-white">
                        {{ getToolNames(run.output.tool_calls || []) }}
                    </td>
                    <td class="border border-gray-600 px-4 py-3 text-white">
                        <div v-for="score in run.scores" :key="score.name">
                            {{ score.name }}: {{ score.score }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
