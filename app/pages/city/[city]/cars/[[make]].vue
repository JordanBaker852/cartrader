<script setup>
    const route = useRoute();
    const cars = await useFetchCars({
        city: route.params.city,
        make: route.params.make,
        minPrice: route.query.minPrice,
        maxPrice: route.query.maxPrice,
    });

    const { capitaliseFirstLetter } = useUtilities();

    watch(() => route.query, () => window.location.reload());

    definePageMeta({
        layout: "custom"
    })

</script>

<template>
    <div>
        <CarCards v-if="cars.length" :cars="cars" />
        <h1 class="text-red-600" v-else >No {{ route.params.make }} cars found in {{ capitaliseFirstLetter(route.params.city) }}</h1>
    </div>
</template>