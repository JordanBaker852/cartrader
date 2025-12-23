<script setup>
    const route = useRoute();
    const cars = await useFetchCars(route.params.city, {
        make: route.path.make,
        minPrice: route.query.minPrice,
        maxPrice: route.query.maxPrice,
    });

</script>

<template>
    <div>
        <CarCards :cars="cars" />
    </div>
</template>