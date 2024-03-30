import * as yup from 'yup'

const required = 'Required field'
const fullNameRegex = /^[A-Z][a-zA-Z]{1,19} [A-Z][a-zA-Z]{1,19}$/

export const loginSchema = yup.object().shape({
    username: yup.string().min(4).required(required),
    password: yup.string().min(6)
})

export const signupSchema = yup.object().shape({
    username: yup.string().min(4).required(required),
    password: yup.string().min(6),
    fullname: yup.string().matches(fullNameRegex, 'Invalid full name').required(required)
})
