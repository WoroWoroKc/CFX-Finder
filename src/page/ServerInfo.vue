<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { Separator } from "@/components/ui/separator";

const route = useRoute();
const serverData = ref(false);

onMounted(() => {
    const cfxKey = route.params.cfxKey;

    axios
        .get(`https://servers-frontend.fivem.net/api/servers/single/${cfxKey}`)
        .then(function (response) {
            const data = response.data.Data;
            const hostname = data.hostname;

            serverData.value = {
                hostname: data.hostname,
                projectName: data.vars.sv_projectName,
                projectDesc: data.vars.sv_projectDesc,
            };
        })
        .catch(function (error) {
            console.log(error);
        });
});
</script>

<template>
    <div>
        <div class="space-y-1">
            <h4 class="text-sm font-medium leading-none">Server Name</h4>
            <p class="text-sm text-muted-foreground">
                {{ serverData.projectName }}
            </p>
            <p class="text-sm text-muted-foreground">
                {{ serverData.hostname }}
            </p>
            <p class="text-sm text-muted-foreground">
                {{ serverData.projectDesc }}
            </p>
        </div>
    </div>
</template>
