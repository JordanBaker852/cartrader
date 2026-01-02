<script setup>
    const route = useRoute();
    const { capitaliseFirstLetter } = useUtilities();

    useHead({
        title: `${capitaliseFirstLetter(route.params.make)} ${capitaliseFirstLetter(route.params.model)}`
    });

    const car = await useFetchCar(route.params.id);

    if (!car.value) {
        throw createError({ statusCode: 404, statusMessage: "Car not found" });
    }
 
    definePageMeta({
        layout: "custom"
    });
</script>  

<template>
    <div v-if="car">
        <CarDetailHero :car="car" />
        <CarDetailAttributes :features="car.features" />
        <CarDetailDescription :description="car.description" />
        <CarDetailContact />
    </div>
</template>