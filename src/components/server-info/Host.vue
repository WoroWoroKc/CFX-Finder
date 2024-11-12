<script setup>
import { Icon } from "@iconify/vue";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const props = defineProps([
    "endopint",
    "ownerName",
    "ownerAvatar",
    "ownerProfile",
    "server",
    "gameBuild",
    "discord",
]);

const formattedIP = () => {
    if (!props.endopint) return "";
    return props.endopint.split(":")[0];
};
</script>

<template>
    <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Host info</h4>
        <div class="flex h-5 items-center space-x-4 text-sm">
            <p class="text-sm text-muted-foreground">
                {{ props.endopint }}
            </p>
            <a
                :href="`https://check-host.net/ip-info?host=${formattedIP(props.endopint)}`"
            >
                <Icon icon="material-symbols:info"
            /></a>
            <Separator orientation="vertical" />
            <Avatar class="w-4 h-4 mr-0">
                <AvatarImage :src="props.ownerAvatar" :alt="props.ownerName" />
                <AvatarFallback>{{ props.ownerName }}</AvatarFallback>
            </Avatar>
            <p class="text-sm text-muted-foreground">
                {{ props.ownerName }}
            </p>
            <a :href="props.ownerProfile" target="_blank"
                ><Icon icon="material-symbols:link-rounded"
            /></a>
            <Separator orientation="vertical" />
            <p class="text-sm text-muted-foreground">
                {{ props.server }}
            </p>
            <Separator orientation="vertical" />
            <HoverCard>
                <HoverCardTrigger
                    ><p class="text-sm text-muted-foreground">
                        {{ props.gameBuild }}
                    </p></HoverCardTrigger
                >
                <HoverCardContent> Server game build </HoverCardContent>
            </HoverCard>

            <Separator orientation="vertical" v-if="props.discord.length" />
            <p
                class="text-sm text-muted-foreground"
                v-if="props.discord.length > 1"
            >
                {{ props.discord }}
            </p>
        </div>
    </div>
</template>
