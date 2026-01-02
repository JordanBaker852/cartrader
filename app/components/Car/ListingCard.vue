<script setup>
    const props = defineProps({
        listing: Object
    });

    const emits = defineEmits(["handleDelete"]);
</script>

<template>
    <div class="shadow rounded overflow-hidden flex justify-between mb-4">
        <div class="flex">
            <img :src="listing.imageUrl" :alt="`${listing.make} ${listing.model}`" class="w-80 mr-3 h-44">
            <div class="p-3">
                <h1 class="text-2xl">{{ listing.make }} {{ listing.model }}</h1>
                <p class="text-blue-400">£{{ listing.price }}</p>
            </div>
        </div>
        <div class="p-3 flex">
            <NuxtLink class="text-blue-400 mr-5" :to="`/profile/listings/view/${listing.id}`">View</NuxtLink>
            <button @click="emits('handleDelete', listing.id)" class="bg-red-400 text-white rounded p-1 h-8">Delete</button>
        </div>
    </div>
</template>