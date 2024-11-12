<script setup>
const props = defineProps(["hostname", "projectName", "projectDesc"]);

const colorMap = {
    "^0": "#F0F0F0",
    "^1": "#F44336",
    "^2": "#4CAF50",
    "^3": "#FFEB3B",
    "^4": "#42A5F5",
    "^5": "#03A9F4",
    "^6": "#9C27B0",
    "^7": "#F0F0F0",
    "^8": "#FF5722",
    "^9": "#9E9E9E",
};

const formatText = (text) => {
    return (
        text.replace(/\^(\d)/g, (match, colorCode) => {
            const color = colorMap[`^${colorCode}`] || "#F0F0F0";
            return `<span style="color: ${color}">`;
        }) + "</span>".repeat((text.match(/\^/g) || []).length)
    );
};
</script>

<template>
    <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Server Name</h4>
        <p
            class="text-sm text-muted-foreground"
            v-html="props.hostname ? formatText(props.hostname) : ''"
        ></p>
        <p
            class="text-sm text-muted-foreground"
            v-html="props.projectName ? formatText(props.projectName) : ''"
        ></p>
        <p
            class="text-sm text-muted-foreground"
            v-html="props.projectDesc ? formatText(props.projectDesc) : ''"
        ></p>
    </div>
</template>
