export default async (filters: Object) => {
    const { data, error } = await useFetch("/api/cars", {
        method: 'GET',
        params: {
            ...filters
        }
    });

    if (error.value)
    {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch cars"
        });
    }

    return data;
};