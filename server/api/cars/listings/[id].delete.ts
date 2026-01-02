const defineEventHandler = async (event: any) => {
    const { id } = event.context.params;

    const item = await prisma.carListings.findUnique({
        where: {
            id: id
        }
    });

    if (!item) {
        throw createError({ 
            statusCode: 400, 
            statusMessage: "Bad Request", 
            message: "Listing doesn't exist"
         });
    }

    await prisma.carListings.delete({
        where: {
            id: id
        }
    });

    return setResponseStatus(event, 204, 'No content');
};

export default defineEventHandler;