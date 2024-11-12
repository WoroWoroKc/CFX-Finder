<script setup>
import { ref, computed } from "vue";
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

const props = defineProps([
    "upvotePower",
    "burstPower",
    "clients",
    "maxClients",
    "players",
    "resources",
]);

const mode = useColorMode();

const searchInPlayers = ref("");
const searchInResources = ref("");

const filteredAndSortedPlayers = computed(() => {
    if (!props.players) return [];

    const filteredPlayers = props.players.filter((player) => {
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
    if (!props.resources) return [];

    const filteredResource = props.resources.filter((resource) => {
        return resource
            .toLowerCase()
            .includes(searchInResources.value.toLowerCase());
    });

    return filteredResource.sort((a, b) => a.id - b.id);
});
</script>

<template>
    <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Server Info</h4>
        <div class="flex h-5 items-center space-x-4 text-sm">
            <HoverCard>
                <HoverCardTrigger
                    ><p class="text-sm text-muted-foreground">
                        📈 {{ props.upvotePower }}
                    </p></HoverCardTrigger
                >
                <HoverCardContent>
                    FiveM Upvote is a measure of community support for a FiveM
                    server, where players upvote the server to boost its ranking
                    and visibility on server lists. Higher upvote counts help
                    attract more players by showcasing popularity.
                </HoverCardContent>
            </HoverCard>
            <Separator orientation="vertical" />
            <HoverCard>
                <HoverCardTrigger
                    ><p class="text-sm text-muted-foreground">
                        🔥 {{ props.burstPower }}
                    </p></HoverCardTrigger
                >
                <HoverCardContent>
                    FiveM Burst is a temporary promotional boost that
                    significantly raises a server's position in the server list
                    for a short period. It helps servers gain quick visibility,
                    often used during peak player times to attract attention.
                </HoverCardContent>
            </HoverCard>

            <Separator orientation="vertical" />
            <p class="text-sm text-muted-foreground">
                {{ props.clients }} / {{ props.maxClients }}
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
                                <div v-for="item in filteredAndSortedPlayers">
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
                Resources {{ props.resources.length }}
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
                                <div v-for="item in filteredAndSortedResource">
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
</template>
