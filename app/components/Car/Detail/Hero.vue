<script setup>
    defineProps({
        car: {
            type: Object,
            required: true
        }
    });
</script>

<template>
    <div class="mt-10">
        <NuxtImg :src="car.url" class="w-full" alt="" />
    </div>
    <h1 class="mt-10 text-4xl">{{ car.make }} {{ car.model }}</h1>
    <div class="text-slate-500 flex text-lg mt-3 border-b pb-5 justify-between">
        <div class="flex ">
            <p class="mr-2">{{ car.seats }} {{ car.seats > 1 || car.seats == 0 ? "seats" : "seat" }}</p>
            <p class="mr-2">|</p>
            <p class="mr-2">{{ new Intl.NumberFormat("en-GB").format(car.miles) }} {{ car.miles > 1 || car.miles == 0 ? "miles" : "mile" }}</p>
        </div>
        <div class="font-bold text-2xl">{{ new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(car.price) }}</div>
    </div>
</template>