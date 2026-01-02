const defineEventHandler = async (event: any) => {
    const { id } = event.context.params;

    return await prisma.carListings.findMany({
        where: {
            ownerId: id
        },
        select: {
            id: true,
            imageUrl: true,
            price: true,
            make: true,
            model: true
        }
    });
};

export default defineEventHandler;