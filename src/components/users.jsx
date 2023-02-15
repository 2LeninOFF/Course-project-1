import React, {useState} from 'react'
import api from '../api'

const Users=()=>{

    const[users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((item) => {
            return item._id != userId
        }))
    }

    const textForms = [
    'человек тусанет с тобой сегодня', 
    'человека тусанет с тобой сегодня']
    
const renderPhrase = (number) => {
    const arrayUsersLength = Math.abs(number) % 100;
    if (number === 0) {
      return ('Никто c тобой не тусанет')
    } else if (
      (arrayUsersLength >= 5 && arrayUsersLength < 20) ||
      arrayUsersLength === 1
    ) {
      return `${number} ${textForms[0]}`
    } else if (arrayUsersLength > 1 && arrayUsersLength < 5) {
      return `${number} ${textForms[1]}`
    }
  };

    return (
      <>
    <span className={'badge fs-5 bg-' + (users.length > 0 ? 'primary' : 'danger')}>
        {`${renderPhrase(users.length)}`}
    </span>
    <table className='table'>
    <thead>
      <tr>
        <th scope='col'>Имя</th>
        <th scope='col'>Качества</th>
        <th scope='col'>Профессия</th>
        <th scope='col'>Встретился, раз</th>
        <th scope='col'>Оценка</th>
      </tr>
    </thead>
    <tbody>
        {users.map((user) => {
            return (
                <tr key = {user._id}>
                    <td>{user.name}</td>
                    <td>
                        {user.qualities.map((quality) => {
                            return <span className = {`badge bg-${quality.color} mx-1`} key = {quality._id}> {quality.name} </span>
                        })}
                    </td>
                    <td>
                        {user.profession.name}
                    </td>
                    <td>
                        {user.completedMeetings}
                    </td>
                    <td>
                        {user.rate}
                    </td>
                    <td>
                        <button key = {user._id} type = 'button' className = 'btn btn-danger' onClick = {() => {handleDelete(user._id)}}>delete</button>
                    </td>
                </tr>
            )
        })}
    </tbody>
  </table>
  </>
)
}

export default Users