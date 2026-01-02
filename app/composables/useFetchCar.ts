export default async (id: string) => {
    const { data, error } = await useFetch(`/api/cars/${id}`, {
        method: 'GET'
    });

    if (error.value)
    {
        throw createError({
            ...error.value
        });
    }

    return data;
};