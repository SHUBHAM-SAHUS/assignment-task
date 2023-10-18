import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {

  const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersAndPostCounts = async () => {
            const fetchedUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
            
         
            const postCountsPromises = fetchedUsers.data.map(user => 
                axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
            );
            const postCountsResults = await Promise.all(postCountsPromises);
            
            const usersWithPostCounts = fetchedUsers.data.map((user, index) => ({
                ...user,
                postCount: postCountsResults[index].data.length
            }));

            setUsers(usersWithPostCounts);
        };

        fetchUsersAndPostCounts();
    }, []);

  return (
      <>
      <div className="container">
            <h1 className="mb-5 text-center">User List</h1>
            <ListGroup>
                {users.map(user => (
                    <Link key={user.id} to={`/details/${user.id}`} className='text-decoration-none user-list'>
                        <ListGroup.Item className='d-flex justify-content-between items-center'>
                            <p className='m-0' >Name: {user.name}</p> 
                            <p className='m-0' >Post: {user.postCount}</p>
                        </ListGroup.Item>
                    </Link>
                ))}
            </ListGroup>
        </div>
      </>
  )
}

export default UserList