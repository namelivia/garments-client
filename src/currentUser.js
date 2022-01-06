import axios from 'axios'

const getCurrentUser = async function () {
  if (this.state.currentUser === undefined) {
    const currentUser = await axios.get(
      `${import.meta.env.VITE_APP_API_ENDPOINT}/users/me`,
    )
    this.state.currentUser = currentUser.data
  }
  return this.state.currentUser
}

var store = {
  debug: true,
  state: {
    currentUser: undefined,
  },
  getCurrentUser: getCurrentUser,
}

export default store
