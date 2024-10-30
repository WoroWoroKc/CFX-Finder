<script setup>
import TopMenu from "@/components/TopMenu.vue";
import HomeButton from "@/components/HomeButton.vue";
</script>

<template>
    <HomeButton />
    <TopMenu />
    <div class="m-0 p-0 flex justify-center items-center min-h-[100vh]">
        <router-view />
    </div>
</template>
