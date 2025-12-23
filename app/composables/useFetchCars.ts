export default async (city: string, filters: Object) => {
    const { data, error } = await useFetch(`/api/cars/${city}`, {
        method: 'GET',
        params: {
            ...filters
        }
    });

    if (error)
    {
        throw createError({
            ...error.value,
            statusMessage: "Unable to fetch cars"
        });
    }

    return data;
};