<script setup>
    const route = useRoute();
    const { capitaliseFirstLetter, replaceHyphensWithSpaces } = useUtilities();
    const { cars } = useCars();

    useHead({
        title: `${capitaliseFirstLetter(route.params.make)} ${capitaliseFirstLetter(route.params.model)}`
    });

    const car = computed(() => {

        if (route.params.modelGuid) {
            return cars.find(c => c.id === route.params.modelGuid);
        }

        //route parameters replace spaces with hyphens for SEO 
        const makeRouteParam = replaceHyphensWithSpaces(route.params.make);
        const modelRouteParam = replaceHyphensWithSpaces(route.params.model);
        
        return cars.find(c => 
            c.make.toLowerCase() === makeRouteParam.toLowerCase() && 
            c.model.toLowerCase() === modelRouteParam.toLowerCase()
        );
    });

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