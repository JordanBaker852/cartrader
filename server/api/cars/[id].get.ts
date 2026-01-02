const defineEventHandler = async (event: any) => {
    const { id } = event.context.params;

    const car = await prisma.carListings.findUnique({
        where: {
            id: id
        }
    });

    return car ?? createError({ statusCode: 404, statusMessage: "Not Found", message: "Requested car not found" });
};

export default defineEventHandler;