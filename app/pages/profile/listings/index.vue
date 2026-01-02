<script setup>
    definePageMeta({
        layout: "custom"
    });

    const user = useSupabaseUser();
    const { data: listings } = await useFetch(`/api/cars/listings/user/${user.value.sub}`);

    const handleDelete = async (id) => {
        try
        {
            await fetch(`/api/cars/listings/${id}`, {
                method: "DELETE"
            });

            listings.value = listings.value.filter(x => x.id != id);
        }
        catch (error)
        {
            console.error(error);
        }
    };
</script>

<template>
    <div>
        <div class="flex justify-between mt-24 items-center">
            <h1 class="text-6xl">My Listsings</h1>
            <NuxtLink to="/profile/listings/create" class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer">+</NuxtLink>
        </div>
        <div v-if="listings.length > 0" class="shadow rounded p-3 mt-5">
            <CarListingCard v-for="listing in listings" :key="listing.id" :listing="listing" @handle-delete="handleDelete"></CarListingCard>
        </div>
        <p v-else>
            You have no listings, create a new listing by select the "+" button
        </p>
    </div>
</template>