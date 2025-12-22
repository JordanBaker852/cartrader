<script setup>
    const error = useError();

    const handleErrorReturn = () => {
        clearError({
            redirect: '/'
        });
    };

    const errorResponses = {
        404: "Page not found",
        500: "An unexpected issue occurred"
    };

    const devMode = process.env.NODE_ENV === "development";
</script>

<template>
    <div class="flex h-screen histify-center items-center flex-col">
        <h1 class="text-9xl">{{error.statusCode}}</h1>
        <p class="mt-7 text-4xl">{{ devMode ? error.message : errorResponses[error.statusCode] }}</p>
        <button class="rounded mt-7 text-2xl bg-blue-400 px-7 py-4 text-white" @click="handleErrorReturn">Go back</button>
    </div>
</template>