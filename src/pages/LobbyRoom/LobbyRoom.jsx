import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Services
import * as lobbyService from '../../services/lobbyService'


const LobbyRoom = ({ user }) => {
  const { id } = useParams()
  const [lobby, setLobby] = useState({})

  // fetch lobby
  useEffect(() => {
    const fetchLobby = async () => {
      console.log("id", id);
      const data = await lobbyService.show(id)
      console.log("data", data);
      setLobby(data)
    }
    fetchLobby()
  }, [id])
  
  // if (!lobby) return <h1>Loading</h1>
  console.log(lobby);
  return (
    <>
    {lobby ? 
          <>
          <h1>{lobby.name}</h1>
          <div>We have lobby</div>
          <h1>{lobby.name}</h1>
          </>
          :
          <div>Loading</div> 
    }
    </>
  )
}

export default LobbyRoom