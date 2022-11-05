import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import { HiChevronLeft } from 'react-icons/hi'
import { employeesType } from './types'

function User() {
  const { id } = useParams()

  const [users, setUser] = useState<employeesType[]>([])
  const BASE_URL = 'http://localhost:5000/employees/'

  const getUsers = async () => {
    await axios.get(`${BASE_URL}${id}`)
      .then(function (res) {
        // we got single object so
        let obj = res.data
        // this is how we wrap object in array
        let arr = [].concat(obj)
        // then pass array to the users
        setUser(arr)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      {
        users.map(({ id, name, username, email, phone, website }, index) => {
          return (
            <section id="user" key={index}>
              <article className='user-info'>
                <p>
                  <Link to='/users' className='back-button'>
                    <Button className='rctooltip' data-tooltip='Back to Home' color='primary' variant='contained'>
                      <HiChevronLeft />
                    </Button>
                  </Link>
                </p>
                <img src={`https://avatars.dicebear.com/api/micah/${id}.svg`} alt='user_avatar' />
                <h1 className='user-name'>{name}</h1>
                <ul>
                  <li><span>Username: </span><span>{username}</span></li>
                  <li><span>Email: </span><span>{email}</span></li>
                  <li><span>Phone: </span><span>{phone}</span></li>
                  <li><span>Website: </span><span>{website}</span></li>
                </ul>
              </article>
            </section>
          )
        })
      }
    </div>
  )
}

export default User