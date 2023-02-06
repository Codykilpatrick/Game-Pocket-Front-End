import { Link, redirect } from "react-router-dom"
import { useState, useEffect } from "react"

import * as lobbyService from '../../services/lobbyService'

const LobbyList = ({ lobbies, user }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    content: ''
  }, [])

  const updateForm = msg => {
    setFormData(msg)
  }

  const handleChange = e => {
    updateForm('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async evt =>{
    evt.preventDefault()
    try {
      await lobbyService.create(formData)
    } catch (err){
      console.log(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await lobbyService.delete(id)
    } catch (err){
      console.log(err);
    }
  }

  return (
    <>
      <h1>These are the available lobbies</h1>
      {lobbies.map((lobby, idx) => (
        <div key={lobby._id}>
          <Link to={`/lobby/${lobby._id}`} >
            <div>
              <h2>Lobby {idx + 1}</h2>
              <h3>Name: {lobby.name}</h3>
              <h3>Description: {lobby.content}</h3>
              <h3>Members: {lobby.members.length}</h3>
            </div>
          </Link>
              <button onClick={() => handleDelete(lobby._id)}>delete</button>
        </div>
      ))}
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="form"
    >
      <div>
        <label htmlFor="name">Lobby Name:</label>
        <input
          type="text"
          autoComplete="off"
          id="name"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="content">Description</label>
        <input
          type="text"
          autoComplete="off"
          id="content"
          value={formData.content}
          name="content"
          onChange={handleChange}
        />
      </div>
      <div className='button-container'>
        <button>New Lobby</button>
      </div>
    </form>
    </>
  )
}

export default LobbyList