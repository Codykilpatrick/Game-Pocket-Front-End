import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

// Services
import * as lobbyService from '../../services/lobbyService'

const LobbyRoom = ({ user }) => {
  const { id } = useParams()
  const [lobby, setLobby] = useState('')

  // fetch lobby
  useEffect(() => {
    const fetchLobby = async () => {
      const data = await lobbyService.show(id)
      setLobby(data)
    }
    fetchLobby()
  }, [id])

  
  if (!lobby) return <h1>Loading</h1>

  return (
    <>
      <h1>{lobby.name}</h1>
      <h2>Description: {lobby.content}</h2>
      <h2>
        Current Members: {
          lobby.members.length
          ?
          lobby.members.map(member => member.name)
          :
          0
        }
      </h2>
      <h2>
        Chatroom: {
          lobby.mainroom.name
          ?
          lobby.mainroom.name
          :
          'No chatroom'
        }
      </h2>   
    </>
  )
}

export default LobbyRoom