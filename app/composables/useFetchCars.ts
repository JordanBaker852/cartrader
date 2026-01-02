export default async (filters: object) => {
    const { data, error } = await useFetch("/api/cars", {
        method: 'GET',
        params: {
            ...filters
        }
    });

    if (error.value)
    {
        throw createError({
            ...error.value
        });
    }

    return data;
};