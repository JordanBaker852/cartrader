const defineEventHandler = async (event: any) => {
    const { make, model } = event.context.params;

    const filteredCars = await prisma.carListings.findMany({
        where: {
            make: make.toLowerCase(),
            model: model.toLowerCase()
        }
    });

    return filteredCars;
};

export default defineEventHandler;