import Joi from "joi";

export const jobValidationSchema = Joi.object({
    clientId: Joi.string().hex().length(24).required(),

    technicianId: Joi.string().hex().length(24).optional(),

    description: Joi.string().trim().min(3).required(),

    title: Joi.string().trim().min(3).required(),

    address: Joi.string().trim().min(5).required(),

    status: Joi.string()
        .valid("pending", "assigned", "inprogress", "completed")
        .optional()
});