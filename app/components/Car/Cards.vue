<script setup>
    
    const props = defineProps({
        cars: {
            type: Array
        }
    });

    const likedCars = useLocalStorage("favouriteCars", []);

    const handleFavourite = (id) => {
        if (likedCars.value.includes(id))
        {
            const likedCarIndex = likedCars.value.indexOf(id);
            likedCars.value.splice(likedCarIndex, 1);
            return;
        }

        likedCars.value.push(id);
    };
</script>

<template>
    <div class="w-full">
        <ClientOnly>
            <CarCard v-for="car in cars" :key="car.id" :car="car" @favourite="handleFavourite" :favoured="likedCars.includes(car.id)" />
        </ClientOnly>
    </div>
</template>