const defineEventHandler = async (event: any) => {
    const { id } = event.context.params;

    return await prisma.messages.findMany({
        where: {
            listingId: id
        }
    });
};

export default defineEventHandler;