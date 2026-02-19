import Joi from "joi";

export const login = {
    body: Joi.object({
        userName: Joi.string().required(),
        passWord: Joi.string().required(),
    })
}

