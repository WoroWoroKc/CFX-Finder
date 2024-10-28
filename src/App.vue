<script setup>
import Settings from "@/components/Settings.vue";
import HomeButton from "@/components/HomeButton.vue";
</script>

<template>
    <HomeButton />
    <Settings />
    <div class="m-0 p-0 flex justify-center items-center min-h-[100vh]">
        <router-view />
    </div>
</template>
