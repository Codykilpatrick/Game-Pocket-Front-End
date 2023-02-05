import { Link } from "react-router-dom"

const LobbyList = ({ lobbies, user }) => {

  return (
    <>
      <h1>These are the available lobbies</h1>
      {lobbies.map((lobby, idx) => (
        <div key={lobby._id}>
          <Link to={`/lobby/${lobby._id}`}>
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
      onSubmit=""
      className="form"
    >
      <div>
        <label htmlFor="name">Lobby Name:</label>
        <input
          type="text"
          autoComplete="off"
          id="name"
          value="{formData.name}"
          name="name"
          onChange="{handleChange}"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          autoComplete="off"
          id="description"
          value="{formData.pw}"
          name="description"
          onChange="{handleChange}"
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