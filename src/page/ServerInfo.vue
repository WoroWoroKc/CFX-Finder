<script setup>
import { Icon } from "@iconify/vue";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const serverData = ref(null);

// Mapowanie kolorów
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

// Funkcja do parsowania kolorowego tekstu
function formatText(text) {
    return (
        text.replace(/\^(\d)/g, (match, colorCode) => {
            const color = colorMap[`^${colorCode}`] || "#F0F0F0"; // domyślnie biały
            return `<span style="color: ${color}">`;
        }) + "</span>".repeat((text.match(/\^/g) || []).length)
    );
}

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
        <div class="space-y-1">
            <h4 class="text-sm font-medium leading-none">Server Name</h4>
            <p
                class="text-sm text-muted-foreground"
                v-html="serverData ? formatText(serverData.hostname) : ''"
            ></p>
            <p
                class="text-sm text-muted-foreground"
                v-html="serverData ? formatText(serverData.projectName) : ''"
            ></p>
            <p
                class="text-sm text-muted-foreground"
                v-html="serverData ? formatText(serverData.projectDesc) : ''"
            ></p>
        </div>
        <Separator class="my-4" label="Host" />
        <div class="space-y-1">
            <h4 class="text-sm font-medium leading-none">Host info</h4>
            <div class="flex h-5 items-center space-x-4 text-sm">
                <p class="text-sm text-muted-foreground">
                    {{ serverData.endopint }}
                </p>
                <Icon icon="material-symbols:info" />
                <Separator orientation="vertical" />
                <Avatar class="w-4 h-4 mr-0">
                    <AvatarImage
                        :src="serverData.ownerAvatar"
                        :alt="serverData.ownerName"
                    />
                    <AvatarFallback>{{ serverData.ownerName }}</AvatarFallback>
                </Avatar>
                <p class="text-sm text-muted-foreground">
                    {{ serverData.ownerName }}
                </p>
                <a :href="serverData.ownerProfile" target="_blank"
                    ><Icon icon="material-symbols:link-rounded"
                /></a>
                <Separator orientation="vertical" />
                <p class="text-sm text-muted-foreground">
                    {{ serverData.server }}
                </p>
                <Separator orientation="vertical" />
                <p class="text-sm text-muted-foreground">
                    {{ serverData.gameBuild }}
                </p>
                <Separator
                    orientation="vertical"
                    v-if="serverData.discord.length > 1"
                />
                <p
                    class="text-sm text-muted-foreground"
                    v-if="serverData.discord.length > 1"
                >
                    {{ serverData.discord }}
                </p>
            </div>
        </div>
        <Separator class="my-4" label="Game" />
        <div class="space-y-1">
            <h4 class="text-sm font-medium leading-none">Server Info</h4>
            <div class="flex h-5 items-center space-x-4 text-sm">
                <p class="text-sm text-muted-foreground">
                    📈 {{ serverData.upvotePower }}
                </p>
                <Separator orientation="vertical" />
                <p class="text-sm text-muted-foreground">
                    🔥 {{ serverData.burstPower }}
                </p>
                <Separator orientation="vertical" />
                <p class="text-sm text-muted-foreground">
                    {{ serverData.clients }} / {{ serverData.maxClients }}
                </p>
            </div>
        </div>
    </div>
</template>
