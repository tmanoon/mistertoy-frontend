import * as yup from 'yup'

const required = 'Required field'

export const editSchema = yup.object().shape({
    name: yup.string().min(3).required(required),
    price: yup.number().max(1000, 'Too pricey - wrong site.')
})