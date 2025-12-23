<script setup>
    definePageMeta({
        layout: "custom"
    });

    const user = useSupabaseUser();
</script>

<template>
    <h1>User logged in</h1>
    {{ user }}
</template>