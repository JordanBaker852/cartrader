import cars from "@/data/cars.json";

const defineEventHandler = (event: any) => {
    const { id } = event.context.params;

    const car = cars.find(x => x.id == id);

    return car ?? createError({ statusCode: 404, statusMessage: "Car not found" });
};

export default defineEventHandler;