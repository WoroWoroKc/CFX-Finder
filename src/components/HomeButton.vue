<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
    <div class="absolute top-5 left-5 cursor-pointer" @click="router.push('/')">
        Home
    </div>
</template>
