import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import './Users.css'
import { AiOutlineDrag } from 'react-icons/ai'
import { MdOutlineDragHandle } from 'react-icons/md'
import 'react-select-search/style.css'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import AddUser from './AddUser'
import EditUser from './EditUser'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'

import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'
import { employeesType } from './types'

function Users() {
    const [users, setUsers] = useState<employeesType[]>([])
    const [fetchError, setFetchError] = useState('')
    const BASE_URL = 'http://localhost:5000/employees/'

    const [rowId, updateRowId] = useState<number | null>()
    const addUserModal = useRef<HTMLDialogElement>(null)
    const editUserModal = useRef<HTMLDialogElement>(null)

    const getUsers = async () => {
        await axios.get(BASE_URL)
            .then(function (res) {
                setUsers(res.data)
            })
            .catch(function (err) {
                setFetchError('fetch-error')
            })
    }

    const deleteUser = async (id: number) => {
        await axios.delete(`${BASE_URL}${id}`)
        getUsers()
        toast.info('The User is deleted', {
            type: 'error',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        })
    }

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) return
        const items = Array.from(users)
        const [recordedItem] = items.splice(source.index, 1)
        items.splice(destination.index, 0, recordedItem)

        // update users value each time drag ends
        setUsers(items)
    }

    // opening and closing of moadals

    const openEditUserModal = () => {
        if (editUserModal.current) {
            editUserModal.current.showModal()
        }
    }

    const openAddUserModal = () => {
        if (addUserModal.current) {
            addUserModal.current.showModal()
        }
    }

    const closeAddUserModal = () => {
        if (addUserModal.current) {
            addUserModal.current.close()
            getUsers()
        }
    }

    const closeEditUserModal = () => {
        if (editUserModal.current) {
            editUserModal.current.close()
            updateRowId(null)
            getUsers()
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className='users'>
            <div className='users-heading'>
                <span><h1>Employees</h1></span>
                <span>
                    <Tooltip arrow title='Add Employee'>
                        <Fab color="primary" size='medium' onClick={openAddUserModal}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </span>
            </div>

            <dialog id='add-user-modal' ref={addUserModal}>
                <AddUser close={closeAddUserModal} />
            </dialog>

            <dialog id='edit-user-modal' ref={editUserModal}>
                {rowId ? <EditUser id={rowId} close={closeEditUserModal} /> : null}
            </dialog>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><AiOutlineDrag /></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId='users'>
                            {(provided) => (
                                <TableBody className={fetchError} {...provided.droppableProps} ref={provided.innerRef}>
                                    {
                                        users.map(({ id, name, username, email, phone, website }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={`${id}`} index={index}>
                                                    {(provided) => (
                                                        <TableRow {...provided.draggableProps} ref={provided.innerRef}>
                                                            <TableCell {...provided.dragHandleProps} ref={provided.innerRef}><MdOutlineDragHandle /></TableCell>
                                                            {/* <th scope='row'>{index + 1}</th> */}
                                                            <TableCell>{name}</TableCell>
                                                            <TableCell>{username}</TableCell>
                                                            <TableCell>{email}</TableCell>
                                                            <TableCell>{phone}</TableCell>
                                                            <TableCell>{website}</TableCell>
                                                            <TableCell className='action'>
                                                                <Tooltip arrow title='View Employee'>
                                                                    <Link to={`/users/${id}`}>
                                                                        <IconButton color='secondary'>
                                                                            <VisibilityIcon />
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                                <Tooltip arrow title='Edit Employee'>
                                                                    <IconButton color='primary' onClick={() => { updateRowId(id); openEditUserModal() }}>
                                                                        <EditIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip arrow title='Delete Employee'>
                                                                    <IconButton color='error' onClick={() => { deleteUser(id) }}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </Draggable>
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </TableBody>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Table>
            </TableContainer>
            <ToastContainer />
        </div>
    )
}

export default Users