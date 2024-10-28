<script setup>
import { useColorMode } from "@vueuse/core";

import { Icon } from "@iconify/vue";

// Components
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Button } from "@/components/ui/button";

const mode = useColorMode();
</script>
<template>
    <div class="absolute top-5 right-5">
        <Popover>
            <PopoverTrigger>
                <Button>
                    <Icon icon="material-symbols:settings-outline" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <ToggleGroup v-model="mode" type="single" variant="outline">
                    <ToggleGroupItem value="light">
                        <Icon icon="ri:sun-fill" />
                        <div class="pl-1">Light</div>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark">
                        <Icon icon="ri:moon-fill" />
                        <div class="pl-1">Dark</div>
                    </ToggleGroupItem>
                    <!-- <ToggleGroupItem value="auto">
                        <Icon icon="ri:settings-3-fill" />
                        <div class="pl-1">Auto</div>
                    </ToggleGroupItem> -->
                </ToggleGroup>
            </PopoverContent>
        </Popover>
    </div>
</template>
