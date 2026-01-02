import { equal } from "joi";

const defineEventHandler = async (event: any) => {
    const { city, make, model, minPrice, maxPrice } = getQuery(event);

    console.log(getQuery(event));

    const filters: any = {};

    if (city)
    {
        filters.city = city.toString();
    }

    if (make) {
        filters.make = {
            equals: make.toString(),
            mode: "insensitive"
        }
    }

    if (model) {
        filters.model = {
            equals: model.toString(),
            mode: "insensitive"
        }
    }

    if (minPrice || maxPrice)
    {
        filters.price = {};

        if (minPrice) {
            filters.price.gte = Number(minPrice);
        }

        if (maxPrice) {
            filters.price.lte = Number(maxPrice);
        }
    }

    return await prisma.carListings.findMany({
        where: filters
    });
};

export default defineEventHandler;