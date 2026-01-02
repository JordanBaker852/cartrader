import Joi from "joi";

const schema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().required().min(1886).max(new Date().getFullYear() + 1),
    miles: Joi.number().required().min(0),
    city: Joi.string().required(),
    seats: Joi.number().required().min(1).max(17),
    features: Joi.array().items(Joi.string().min(1)).required().min(1),
    imageUrl: Joi.string().required(),
    price: Joi.number().required().min(1),
    ownerId: Joi.string().required().length(36),
    description: Joi.string().required().min(10)
});

const defineEventHandler = async (event: any) => {
    const body = await readBody(event);
    const { error } = await schema.validate(body);

    if (error)
    {
        throw createError({ 
            statusCode: 400, 
            statusMessage: "Bad Request", 
            message: error.message
         });
    }

    return await prisma.carListings.create({
        data: {
            ...body,
            city: body.city.toLowerCase()
        }
    });
};

export default defineEventHandler;