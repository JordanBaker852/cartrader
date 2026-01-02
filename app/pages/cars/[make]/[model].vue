<script setup>
    const route = useRoute();
    const cars = await useFetchCars({
        make: route.params.make,
        model: route.params.model
    });

    definePageMeta({
        layout: "custom"
    });

</script>

<template>
    <div>
        <CarCards v-if="cars.length" :cars="cars" />
        <h1 class="text-red-600" v-else >No {{ route.params.make }} {{ route.params.model }} found</h1>
    </div>
</template>