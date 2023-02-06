import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import { Link } from 'react-router-dom'


const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  return (
    <>
      <div id='defender'>
        <div className='page-head'>
        <h1>ALL PLAYERS</h1>
        </div>
          <div className='body'>
          {profiles.length ? 
            <div className='player-list'>
              {profiles.map(profile =>
                <Link to={`/profiles/${profile._id}`} key={profile._id} className='player' state={profile}>{profile.name}</Link>
                )}
            </div>
          :
          <p>No profiles yet</p>
        }
        </div>
      </div>
    </>
  )
}

export default Profiles