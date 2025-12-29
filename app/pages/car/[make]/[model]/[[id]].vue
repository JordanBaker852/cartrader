<script setup>
    const route = useRoute();
    const { capitaliseFirstLetter, replaceHyphensWithSpaces } = useUtilities();
    const { fetchCarById, fetchCarByMakeAndModel } = useFetchCar();

    useHead({
        title: `${capitaliseFirstLetter(route.params.make)} ${capitaliseFirstLetter(route.params.model)}`
    });

    const fetchCarFromRouteParams = async () => { 

        if (route.params.id) {
            return await fetchCarById(route.params.id);
        }

        //route parameters replace spaces with hyphens for SEO 
        const makeRouteParam = replaceHyphensWithSpaces(route.params.make);
        const modelRouteParam = replaceHyphensWithSpaces(route.params.model);
        
        return await fetchCarByMakeAndModel(makeRouteParam, modelRouteParam);
    };

    const car = await fetchCarFromRouteParams();

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