<script setup>
    const route = useRoute();
    const { isLastCharacterAnS, capitaliseFirstLetter } = useUtilities();

    const tryGetCarMake = () => {
        if (route.params.make)
        {
            const capitalisedMake = capitaliseFirstLetter(route.params.make);
            return isLastCharacterAnS(route.params.make) ? `${capitalisedMake}'` : `${capitalisedMake}'s` 
        }

        return "Cars";
    };

    useHead({
        title: `${tryGetCarMake()} in ${capitaliseFirstLetter(route.params.city)}`
    });

    definePageMeta({
        layout: "custom"
    });
</script>   

<template>
    <div class="mt-32 flex ">
        <NuxtErrorBoundary>
            <CarSideBar />
            <NuxtPage />
            <template #error="{error, clearError}">
                <div class="text-center mx-auto flex flex-col">
                    <h1 class="text-5xl text-red-600 mb-4">Sorry, something went wrong</h1>
                    <code>{{ error }}</code>
                    <button class="text-white bg-blue-400 px-10 py-3 rounded mt-4" type="button" @click="clearError">Go Back</button>
                </div>
            </template>
        </NuxtErrorBoundary>
    </div>
</template>