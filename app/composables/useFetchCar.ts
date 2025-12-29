const useFetchCar = () => {

    const fetchCarById = async (id: string) => {
        const { data, error } = await useFetch(`/api/cars/${id}`, {
            method: 'GET'
        });

        if (error.value)
        {
            throw createError({
                ...error.value,
                statusMessage: "Unable to fetch the requested car"
            });
        }

        return data;
    };

    const fetchCarByMakeAndModel = async (make: string, model: string) => {
        const { data, error } = await useFetch(`/api/cars/${make}/${model}`, {
            method: 'GET'
        });

        if (error.value)
        {
            throw createError({
                ...error.value,
                statusMessage: "Unable to fetch the requested car"
            });
        }

        return data;
    };

    return {
        fetchCarById,
        fetchCarByMakeAndModel
    };
};

export default useFetchCar;