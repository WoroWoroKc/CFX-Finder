<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { Separator } from "@/components/ui/separator";

import ServerName from "@/components/server-info/ServerName.vue";
import Host from "@/components/server-info/Host.vue";
import Game from "@/components/server-info/game/index.vue";

const route = useRoute();
const serverData = ref(null);

onMounted(() => {
    const cfxKey = route.params.cfxKey;

    axios
        .get(`https://servers-frontend.fivem.net/api/servers/single/${cfxKey}`)
        .then((response) => {
            const data = response.data.Data;

            serverData.value = {
                hostname: data.hostname,
                projectName: data.vars.sv_projectName,
                projectDesc: data.vars.sv_projectDesc,
                endopint: data.connectEndPoints[0],
                clients: data.clients,
                maxClients: data.svMaxclients,
                ownerName: data.ownerName,
                ownerAvatar: data.ownerAvatar,
                ownerProfile: data.ownerProfile,
                server: data.server,
                gameBuild: data.vars.sv_enforceGameBuild,
                upvotePower: data.upvotePower,
                burstPower: data.burstPower,
                players: data.players,
                resources: data.resources,
                discord: data.vars.Discord || data.vars.discord,
            };
        })
        .catch((error) => {
            console.log(error);
        });
});
</script>

<template>
    <div v-if="serverData">
        <ServerName
            v-if="serverData"
            :hostname="serverData.hostname"
            :projectName="serverData.projectName"
            :projectDesc="serverData.projectDesc"
        />
        <Separator class="my-4" label="Host" />
        <Host
            v-if="serverData"
            :endopint="serverData.endopint"
            :ownerName="serverData.ownerName"
            :ownerAvatar="serverData.ownerAvatar"
            :ownerProfile="serverData.ownerProfile"
            :server="serverData.server"
            :gameBuild="serverData.gameBuild"
            :discord="serverData.discord"
        />
        <Separator class="my-4" label="Game" />
        <Game
            :upvotePower="serverData.upvotePower"
            :burstPower="serverData.burstPower"
            :clients="serverData.clients"
            :maxClients="serverData.maxClients"
            :players="serverData.players"
            :resources="serverData.resources"
        />
    </div>
</template>
