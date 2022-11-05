import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import './Users.css'

import { useFormik } from 'formik'
import { userSchema } from './schemas'
import { changeUserProps } from './types';


const userInitialValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
}


function AddUser(props: changeUserProps) {
    const closeModal = props.close
    const BASE_URL = 'http://localhost:5000/employees'

    const addUserForm = useFormik({
        initialValues: userInitialValues,
        validationSchema: userSchema,
        onSubmit: (values, action) => {
            axios.post(BASE_URL, values)
            action.resetForm()
            closeModal()
        }
    })

    return (
        <section id="add_users">
            <article>
                <h1 className='add-user-title'>Add Employee</h1>
                <div className='react-form1'>
                    <Form onSubmit={addUserForm.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                autoComplete='on'
                                id='name'
                                value={addUserForm.values.name}
                                onChange={addUserForm.handleChange}
                                onBlur={addUserForm.handleBlur}
                            />
                            {addUserForm.errors.name && addUserForm.touched.name ?
                                (<p className='user-error'>{addUserForm.errors.name}</p>) :
                                null}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name='username'
                                autoComplete='on'
                                id='username'
                                value={addUserForm.values.username}
                                onChange={addUserForm.handleChange}
                                onBlur={addUserForm.handleBlur}
                            />
                            {addUserForm.errors.username && addUserForm.touched.username ?
                                (<p className='user-error'>{addUserForm.errors.username}</p>) :
                                null}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                autoComplete='on'
                                id='email'
                                value={addUserForm.values.email}
                                onChange={addUserForm.handleChange}
                                onBlur={addUserForm.handleBlur}
                            />
                            {addUserForm.errors.email && addUserForm.touched.email ?
                                (<p className='user-error'>{addUserForm.errors.email}</p>) :
                                null}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone No.</Form.Label>
                            <Form.Control
                                type="number"
                                name='phone'
                                autoComplete='on'
                                id='phone'
                                value={addUserForm.values.phone}
                                onChange={addUserForm.handleChange}
                                onBlur={addUserForm.handleBlur}
                            />
                            {addUserForm.errors.phone && addUserForm.touched.phone ?
                                (<p className='user-error'>{addUserForm.errors.phone}</p>) :
                                null}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Website</Form.Label>
                            <Form.Control
                                type="text"
                                name='website'
                                autoComplete='on'
                                id='website'
                                value={addUserForm.values.website}
                                onChange={addUserForm.handleChange}
                                onBlur={addUserForm.handleBlur}
                            />
                            {addUserForm.errors.website && addUserForm.touched.website ?
                                (<p className='user-error'>{addUserForm.errors.website}</p>) :
                                null}
                        </Form.Group>
                        <Button variant='contained' color='primary' type="submit" style={{ marginRight: "0.5rem" }} >Add Employee</Button>
                        <Button variant='contained' color='error' type="reset" onClick={closeModal}>Cancel</Button>
                    </Form>
                </div>
            </article>
        </section>
    )
}

export default AddUser