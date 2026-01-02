<script setup>
    const city = ref("");
    const isInputError = ref(false);

    const handleSearch = () => {
        if (!city.value)
        {
            return isInputError.value = true;
        }

        navigateTo(`/city/${city.value.toLowerCase()}/cars`);
    };

    const handleInputValidation = () => {
        return isInputError.value = city.value.length == 0;
    };

</script>

<template>
    <div class="font-serif w-[1000px] text-2xl rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto">
        <input
            type="text" 
            placeholder="Search by city..." 
            class="py-3 px-5 w-full text-2xl rounded focus:outline-none" 
            :class="isInputError ? 'bg-red-300' : ''" 
            v-model="city"
            @input="handleInputValidation">
        </input>
        <button class="bg-sky-500 px-10 text-white" @click="handleSearch">Search</button>
    </div>
</template>