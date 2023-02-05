import { Link, redirect } from "react-router-dom"
import { useState, useEffect } from "react"

import * as lobbyService from '../../services/lobbyService'
import * as chatroomService from '../../services/chatroomService'

const LobbyList = ({ lobbies, user }) => {
  
  const [chatroom, setChatroom] = useState({})

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

   // create chatroom
  useEffect(() => {
    const createChatroom = async () => {
      const data = await chatroomService.create()
      setChatroom(data)
    }
    createChatroom()
  }, [])

  return (
    <>
      <h1>These are the available lobbies</h1>
      {lobbies.map((lobby, idx) => (
        <div key={lobby._id}>
          <Link to={`/lobby/${lobby._id}`} state={chatroom}>
            <div>
              <h2>Lobby {idx + 1}</h2>
              <h3>Name: {lobby.name}</h3>
              <h3>Description: {lobby.content}</h3>
              <h3>Members: {lobby.members.length}</h3>
            </div>
          </Link>
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