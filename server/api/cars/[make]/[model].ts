import cars from "@/data/cars.json";

const defineEventHandler = (event: any) => {
    const { make, model } = event.context.params;

    const car = cars.find(x => 
        x.make.toLocaleLowerCase() == make.toLocaleLowerCase() 
        && 
        x.model.toLocaleLowerCase() == model.toLocaleLowerCase()
    );

    return car ?? createError({ statusCode: 404, statusMessage: "Car not found" });
};

export default defineEventHandler;