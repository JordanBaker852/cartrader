<script setup>
    const props = defineProps({
        title: String,
        name: String,
        type: String,
        minimum: [Number, null],
        maximum: [Number, null],
        placeholder: String
    });

    const emits = defineEmits(["inputOnChange"]);
    const state = ref("");

    const onChange = () => {
        emits("inputOnChange", state.value, props.name);
    };
</script>

<template>
    <div class="flex flex-col w-[48%] mt-2">
        <label class="text-cyan-500 mb-1 text-sm">{{ title }}</label>
        <input class="p-2 border w-100 rounded" :type="type" :placeholder="placeholder" v-model="state" :name="name" :max="maximum" :min="minimum" @input="onChange">
    </div>
</template>