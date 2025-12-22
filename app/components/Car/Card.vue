<script setup lang="ts">
    import heartFilled from "@/assets/heartFilled.png";
    import heartOutline from "@/assets/heartOutline.png";

    const props = defineProps({
        car: {
            type: Object,
            required: true
        },
        favoured: {
            type: Boolean,
            required: true
        }
    });

    const { convertStringToUrlSlug } = useUtilities();

    const emit = defineEmits(["favourite"]);

    const handleFavouriteClick = (event: PointerEvent) => {
        event.stopPropagation();
        emit('favourite', props.car.id);
    };
</script>

<template>
    <div class="relative shadow w-full border overflow-hidden mb-5 cursor-pointer h-[200px]"
        @click="navigateTo(`/car/${convertStringToUrlSlug(car.make)}/${convertStringToUrlSlug(car.model)}/${car.id}`)">
        <img class="absolute w-7 right-5 top-2 z-20" :src="favoured ? heartFilled : heartOutline" alt="" @click="(event) => handleFavouriteClick(event)" />
        <div class="flex h-full">
            <NuxtImg :src="car.url" alt="Lightning McQueen" class="w-[300px] h-full" />
            <div class="p-4 flex flex-col">
                <div>
                    <h1 class="text-2xl text-blue-700">{{ `${car.make} ${car.model}` }}</h1>
                    <p class="text-gray-700">{{ car.description }}</p>
                </div>
                <h1 class="mt-auto text-xl">{{ new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(car.price) }}</h1>
            </div>
        </div>
    </div>
</template>