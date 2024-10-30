<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useColorMode } from "@vueuse/core";

import { Icon } from "@iconify/vue";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mode = useColorMode();
const route = useRoute();
const serverData = ref(null);

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

function formatText(text) {
    return (
        text.replace(/\^(\d)/g, (match, colorCode) => {
            const color = colorMap[`^${colorCode}`] || "#F0F0F0";
            return `<span style="color: ${color}">`;
        }) + "</span>".repeat((text.match(/\^/g) || []).length)
    );
}

const formattedIP = () => {
    if (!serverData.value || !serverData.value.endopint) return "";
    return serverData.value.endopint.split(":")[0];
};

const searchInPlayers = ref("");
const searchInResources = ref("");

const filteredAndSortedPlayers = computed(() => {
    if (!serverData.value) return [];

    const filteredPlayers = serverData.value.players.filter((player) => {
        return (
            player.name
                .toLowerCase()
                .includes(searchInPlayers.value.toLowerCase()) ||
            player.id.toString().includes(searchInPlayers.value)
        );
    });

    return filteredPlayers.sort((a, b) => a.id - b.id);
});

const filteredAndSortedResource = computed(() => {
    if (!serverData.value) return [];

    const filteredResource = serverData.value.resources.filter((resource) => {
        return resource
            .toLowerCase()
            .includes(searchInResources.value.toLowerCase());
    });

    return filteredResource.sort((a, b) => a.id - b.id);
});

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
                <a
                    :href="`https://check-host.net/ip-info?host=${formattedIP(serverData.endopint)}`"
                >
                    <Icon icon="material-symbols:info"
                /></a>
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
                <HoverCard>
                    <HoverCardTrigger
                        ><p class="text-sm text-muted-foreground">
                            {{ serverData.gameBuild }}
                        </p></HoverCardTrigger
                    >
                    <HoverCardContent> Server game build </HoverCardContent>
                </HoverCard>

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
                <HoverCard>
                    <HoverCardTrigger
                        ><p class="text-sm text-muted-foreground">
                            📈 {{ serverData.upvotePower }}
                        </p></HoverCardTrigger
                    >
                    <HoverCardContent>
                        FiveM Upvote is a measure of community support for a
                        FiveM server, where players upvote the server to boost
                        its ranking and visibility on server lists. Higher
                        upvote counts help attract more players by showcasing
                        popularity.
                    </HoverCardContent>
                </HoverCard>
                <Separator orientation="vertical" />
                <HoverCard>
                    <HoverCardTrigger
                        ><p class="text-sm text-muted-foreground">
                            🔥 {{ serverData.burstPower }}
                        </p></HoverCardTrigger
                    >
                    <HoverCardContent>
                        FiveM Burst is a temporary promotional boost that
                        significantly raises a server's position in the server
                        list for a short period. It helps servers gain quick
                        visibility, often used during peak player times to
                        attract attention.
                    </HoverCardContent>
                </HoverCard>

                <Separator orientation="vertical" />
                <p class="text-sm text-muted-foreground">
                    {{ serverData.clients }} / {{ serverData.maxClients }}
                </p>
                <Sheet>
                    <SheetTrigger>
                        <Icon icon="material-symbols:list-alt-rounded"
                    /></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Player list</SheetTitle>
                            <SheetDescription>
                                List of all players on a given server
                            </SheetDescription>

                            <Input
                                type="text"
                                placeholder="Player name or ID"
                                v-model="searchInPlayers"
                            />

                            <ScrollArea class="rounded-md border h-[82vh] mt-1">
                                <div class="p-4">
                                    <div
                                        v-for="item in filteredAndSortedPlayers"
                                    >
                                        <div class="text-sm">
                                            <span
                                                class="text-gray-800"
                                                :class="
                                                    mode == 'dark'
                                                        ? 'text-gray-600'
                                                        : 'text-gray-900'
                                                "
                                                >[{{ item.id }}]
                                            </span>
                                            <span class="font-bold">{{
                                                item.name
                                            }}</span>
                                        </div>
                                        <Separator class="my-2" />
                                    </div>
                                </div>
                            </ScrollArea>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                <Separator orientation="vertical" />
                <p class="text-sm text-muted-foreground">
                    Resources {{ serverData.resources.length }}
                </p>
                <Sheet>
                    <SheetTrigger>
                        <Icon icon="material-symbols:list-alt-rounded"
                    /></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Resources list</SheetTitle>
                            <SheetDescription>
                                List of all resources
                            </SheetDescription>

                            <Input
                                type="text"
                                placeholder="Resources name"
                                v-model="searchInResources"
                            />

                            <ScrollArea class="rounded-md border h-[82vh] mt-1">
                                <div class="p-4">
                                    <div
                                        v-for="item in filteredAndSortedResource"
                                    >
                                        <div class="text-sm">
                                            <span class="font-bold">{{
                                                item
                                            }}</span>
                                        </div>
                                        <Separator class="my-2" />
                                    </div>
                                </div>
                            </ScrollArea>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </div>
</template>
