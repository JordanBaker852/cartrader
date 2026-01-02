<script setup>
    definePageMeta({
        layout: "custom"
    });

    const { makes } = useCars();
    const user = useSupabaseUser();

    const info = useState("listingInfo", () => {
        return {
            make: "",
            model: "",
            year: 0,
            miles: 0,
            price: 0,
            city: "",
            seats: 0,
            features: "",
            imageUrl: "placeholder.png"
        };
    });

    const isError = ref(false);

    const onChange = (data, name) => {
        if (!info.value[name] in info.value)
        {
            return;
        }
        else if (typeof(info.value[name]) == "number") {
            info.value[name] = parseInt(data);
        }
        else {
            info.value[name] = data;
        }

        return;
    };

    const inputs = [
        {
            id: "3acd3c7e-4bdb-4369-87a2-497ed4bd9f92",
            title: "Model *",
            name: "model",
            type: "text",
            minimum: null,
            maximun: null,
            placeholder: "Yaris "
        },
        {
            id: "e8d4ce0a-3668-4064-976c-9e3c6ee8552d",
            title: "Year *",
            name: "year",
            type: "number",
            minimum: 1925,
            maximun: 2025,
            placeholder: "2025"
        },
        {
            id: "7676bb04-5343-4575-9eee-d0828bee28e1",
            title: "Miles *",
            name: "miles",
            type: "number",
            minimum: 0,
            maximum: null,
            placeholder: "75000"
        },
        {
            id: "954028a2-23be-4f66-808e-5eb21eed04d7",
            title: "Price *",
            name: "price",
            type: "number",
            minimum: 0,
            maximum: null,
            placeholder: "20000"
        },
        {
            id: "e80d2e11-1855-4bb1-ae67-8fa2f419f888",
            title: "City *",
            name: "city",
            type: "text",
            minimum: null,
            maximum: null,
            placeholder: "Weston-super-Mare"
        },
        {
            id: "93891b54-7a80-4efc-a2ec-1c39e93083bc",
            title: "Seats *",
            name: "seats",
            type: "number",
            minimum: 0,
            maximum: null,
            placeholder: "5"
        },
        {
            id: "cfc55e7d-54b8-4dc9-ab38-c4f455269c3c",
            title: "Features *",
            name: "features",
            type: "text",
            minimum: null,
            maximum: null,
            placeholder: "Leather interior, No accidents"
        }
    ];

    const isButtonDisabled = computed(() => {
        for (let key in info.value)
        {
            if (!info.value[key])
            {
                return true
            }
        }

        return false;
    });

    const handleSubmit = async () => {
        if (isButtonDisabled.value)
        {
            return;
        }

        const body = {
            ...info.value,
            features: info.value.features.split(", "),
            ownerId: user.value.sub,
            imageUrl: info.value.image?.name ?? "placeholder.png"
        };

        delete body.image;

        try
        {
            const response = await fetch("/api/cars/listings", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok)
            {
                return navigateTo("/profile/listings");
            }
            
            const json = await response.json();
            console.error(json);
        }
        catch (error) {
            console.error(error);
        }

        isError.value = true;
    };
</script>

<template>
    <div>
        <div class="mt-24">
            <h1 class="text-6xl">Create a New Listing</h1>
        </div>
        <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
            <CarListingSelect title="Make *" :options="makes" name="make" @select-on-change="onChange" />
            <CarListingInput v-for="input in inputs" :key="input.id" :type="input.type" :name="input.name" :title="input.title" :placeholder="input.placeholder" :minimum="input.minimum" :maximum="input.maximun" @input-on-change="onChange" />
            <CarListingTextArea title="Description *" name="description" placeholder="" @input-on-change="onChange" />
            <CarListingImage @change-input="onChange" />
        </div>
        <div>
            <button @click="handleSubmit" :disabled="isButtonDisabled" class="bg-blue-500 text-white rounded py-2 px-7 mt-3">Submit</button>
        </div>
        <span v-if="isError" class="text-red-400">An error has occured, please see the console for details</span>
    </div>
</template>