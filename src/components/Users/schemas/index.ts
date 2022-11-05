import * as Yup from 'yup'

export const userSchema = Yup.object({
    name: Yup.string().min(2).max(25).required('Please enter your name'),
    username: Yup.string().min(2).max(25).required('Please enter your username'),
    email: Yup.string().email().required('Please enter your email'),
    phone: Yup.number().min(6).required('Please enter your phone number'),
    website: Yup.string()
})