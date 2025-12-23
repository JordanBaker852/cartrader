import cars from "@/data/cars.json";

const defineEventHandler = (event: any) => {
    const { city } = event.context.params;
    const { make, minPrice, maxPrice } = getQuery(event);

    let filteredCars = cars.filter((car) => car.city.toLowerCase() === city.toLowerCase());

    if (make) {
        filteredCars = filteredCars.filter((car) => car.make.toLowerCase() === make.toString().toLowerCase());
    }

    if (minPrice) {
        filteredCars = filteredCars.filter((car) => car.price >= Number(minPrice));
    }

    if (maxPrice) {
        filteredCars = filteredCars.filter((car) => car.price <= Number(maxPrice));
    }

    return filteredCars;
};

export default defineEventHandler;