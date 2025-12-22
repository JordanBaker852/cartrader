<script setup>

    const { makes } = useCars();  

    const modal = ref({
        make: false,
        location: false,
        price: false
    });

    const route = useRoute();
    const router = useRouter();

    const priceRangeText = computed(() => {
        const minPrice = route.query.minPrice;
        const maxPrice = route.query.maxPrice;

        if (!minPrice && !maxPrice)
        {
            return "Any";
        }
        else if (!minPrice && maxPrice)
        {
            return `Up to £${maxPrice}`;
        }
        else if (minPrice && !maxPrice)
        {
            return `Over £${minPrice}`;
        }
        else
        {
            return `Between £${minPrice}-£${maxPrice}`;
        }
    });

    const city = ref('');

    const priceRange = ref({
        min:"",
        max: ""
    })

    const updateModal = (key) => {
        if (!(key in modal.value)) {
            return;
        }

        modal.value[key] = !modal.value[key];
    };

    const onLocationChange = () => {
        if (!city.value)
        {
            return;
        }

        if (!isNaN(parseInt(city.value))) 
        {
            throw createError({
                status: 400,
                message: "City format was invalid"
            });
        }

        updateModal('location');

        navigateTo(`/city/${city.value}/car/${route.params.make}`);
    };

    const onMakeChange = (make) => {
        updateModal("make");
        navigateTo(`/city/${route.params.city}/car/${make}`);
    };

    const onPriceChange = () => {
        updateModal('price');

        if (minimumPriceGreaterThanMaximumPrice(priceRange.value.min, priceRange.value.max))
        {
            return;
        }

        let queryString = {}; 

        if (priceRange.value.min)
        {
            queryString["minPrice"] = priceRange.value.min;
        }

        if (priceRange.value.max)
        {
            queryString["maxPrice"] = priceRange.value.max;
        }

        router.push({
            query: queryString
        });
        
    };

    const minimumPriceGreaterThanMaximumPrice = (minimum, maximum) => {
        return (minimum && maximum) && (minimum > maximum);
    };

</script>

<template>
    <div class="shadow border w-64 mr-10 z-30">
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Location</h3>
            <h3 @click="updateModal('location')" class="text-blue-400 capitalize">{{ route.params.city }}</h3>
            <div v-if="modal.location" class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
                <input v-model="city" type="text" class="border p-1 rounded"></input>
                <button @click="onLocationChange" class="bg-blue-400 w-full mt-2 rounded text-white p-1">Apply</button>
            </div>
        </div>

        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Make</h3>
            <h3 @click="updateModal('make')" class="text-blue-400 capitalize">{{ route.params.make ||  "Any" }}</h3>
            <div v-if="modal.make" class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white">
                <h4 v-for="make in makes" :key="make" class="w-1/3" @click="onMakeChange(make)">
                    {{ make }}
                </h4>
            </div>
        </div>

        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Price</h3>
            <h3 @click="updateModal('price')" class="text-blue-400 capitalize">{{ priceRangeText }}</h3>
            <div class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white" v-if="modal.price">
                <input class="border p-1 rounded" type="number" placeholder="Min" min="0" v-model="priceRange.min">
                <input class="border p-1 rounded" type="number" placeholder="Max" min="0" v-model="priceRange.max"></input>
                <button type="button" class="bg-blue-400 w-full mt-2 rounded text-white p-1" @click="onPriceChange">Apply</button>
            </div>
        </div>
    </div>
</template>