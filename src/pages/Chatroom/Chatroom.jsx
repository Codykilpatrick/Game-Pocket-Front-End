import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LobbyList from "../../components/LobbyList/LobbyList"

// Components
import Message from "../../components/Message/Message"
import MessageForm from "../../components/MessageForm/MessageForm"

// Services
import * as chatroomService from '../../services/chatroomService'
import * as messageService from '../../services/messageService'
import { socket } from '../../services/socket';

const Chatroom = ({ user, lobby }) => {
  const { id } = useParams()
  const [chatroom, setChatroom] =useState([])
  const [members, setMembers] = useState([])
  const [messageForm, setMessageForm] = useState({content: ''})
  const [messages, setMessages] = useState([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetchChatroom = async () => {
      const data = await chatroomService.show(id)
      setChatroom(data)
      setMembers(data.members)
      setMessages(data.messages)
    }
    fetchChatroom()
    setRefresh(0)
  }, [refresh])

  socket.on('refreshMessage', () => setRefresh(1))

  const handleChange = e => {
    setMessageForm({
      ...messageForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleSendMessage = async e =>{
    e.preventDefault()
    const data = await messageService.create(messageForm)
    await chatroomService.addMessage(chatroom._id, data._id)
    setMessages([...messages, data])
    setMessageForm({content: ''})
    socket.emit('refreshMessage')
  }

  const deleteMessage = async (id) => {
    const deletedMessage = await messageService.delete(id)
    setMessages(messages.filter(message => message._id !== deletedMessage._id))
    socket.emit('refreshMessage')
  }

  const handleLeaveChatroom = async (id) => {
    await chatroomService.leaveChatroom(id)
    setMembers(members.filter(member => member._id !== user.profile))
  }

  console.log(lobby)

  return (
    <>
      <div id='lobby-room'>
        <h1 className='space-invaders'>{chatroom.name}</h1>
        <div id="lobby-screen">
          <div id="lobby-head">
            <h2>
              Current Members: {
                members?.length
                ?
                members.map(member => (
                  <ul key={member._id}>
                    <li>{member.name}</li>
                  </ul>
                  ))
                :
                0
              }
            </h2>
            <div id="button-container">
              <button onClick={() => handleLeaveChatroom(chatroom._id)}>
                Leave
              </button>
            </div>
          </div>
          <div id="chatroom">
            <div id="message-container">
            {messages?.map(message =>
              <div key={message._id}>
                <Message
                  message={message}
                  deleteMessage={deleteMessage}
                  user={user}
                  />
              </div>
            )}
          </div>
          <div id="send-container">
            <MessageForm
              handleSendMessage={handleSendMessage}
              handleChange={handleChange}
              message={messageForm.content}
            />
          </div>
          </div>  
        </div>
      </div>
    </>
  )
}

export default Chatroom