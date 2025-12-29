import cars from "@/data/cars.json";

const defineEventHandler = (event: any) => {
    const { city, make, minPrice, maxPrice } = getQuery(event);

    let filteredCars = cars;

    if (city)
    {
        filteredCars = cars.filter(x => x.city.toLowerCase() === city.toString().toLowerCase());
    }

    if (make) {
        filteredCars = filteredCars.filter(x => x.make.toLowerCase() === make.toString().toLowerCase());
    }

    if (minPrice) {
        filteredCars = filteredCars.filter(x => x.price >= Number(minPrice));
    }

    if (maxPrice) {
        filteredCars = filteredCars.filter(x => x.price <= Number(maxPrice));
    }

    return filteredCars;
};

export default defineEventHandler;