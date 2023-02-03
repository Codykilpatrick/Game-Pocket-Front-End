import * as tokenService from "./tokenService"

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}`

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/leaderboard`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}`}
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

// DOES THIS WORK?

export {
  index
}