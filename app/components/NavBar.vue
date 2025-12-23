<script setup>
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Error during logout:', error.message);
            return;
        }

        navigateTo('/');
    };
</script>

<template>
    <header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md">
        <NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
        <div v-if="user" class="flex">
            <span class="mr-5">{{ user.user_metadata.full_name }}</span>
            <NuxtLink to="/profile/listings" class="font-bold mr-5">Profile</NuxtLink>
            <button @click="logout" class="font-bold">Logout</button>
        </div>
        <NuxtLink v-else to="/login" class="font-bold">Login</NuxtLink>
    </header>
</template>