import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as profileService from '../../services/profileService'

const Profile = ({ user }) => {
  const { id } = useParams()
  const [profile, setProfile] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfile(id)
      setProfile(data)
    }
    fetchProfile()
  }, [id])

  return (
    <>
      <h1>{profile.name}</h1>
      <img src={
        profile.photo
        ?
        profile.photo
        :
        "https://i.imgur.com/izJwDia.png"
      }
        alt=""
        width="150px"
      />
      <h2>
        Current Records: {
          profile.records
          ?
          profile.records.length
          ?
          profile.records
          :
          'No records yet'
          :
          'Loading...'
        }
      </h2>
      <h2>
        Friends: {
          profile.friends
          ?
          profile.friends.length
          ?
          profile.friends
          :
          'No friends yet'
          :
          'Loading...'
        }
      </h2>
      {
        user.profile === profile._id
        ?
        <h2>Friend Requests: {profile.friendRequests.length}
        </h2>
        :
        //! button needs functionality
        <button>Send friend Request</button>
      }
    </>
  )
}

export default Profile