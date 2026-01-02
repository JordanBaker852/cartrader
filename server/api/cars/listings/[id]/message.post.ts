import Joi from "joi";

const schema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {allow: ["com", "uk"]}
    }).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    name: Joi.string().required(),
    message: Joi.string().min(20).required()
});

const defineEventHandler = async (event: any) => {
    const body = await readBody(event);
    
    if (!body)
    {
        throw createError({ 
            statusCode: 400, 
            statusMessage: "Bad Request", 
            message: "No request body provided"
         });
    }

    const { id } = event.context.params;

    const validListing = await prisma.carListings.findFirst({
        where: {
            id: id
        }
    });

    console.log(validListing);

    const { error } = await schema.validate(body);

    if (error || !validListing)
    {
        throw createError({ 
            statusCode: 400, 
            statusMessage: "Bad Request", 
            message: error ? error.message : "Requested listing doesn't exist"
         });
    }

    return await prisma.messages.create({
        data: {
            ...body,
            listingId: id
        }
    });
};

export default defineEventHandler;