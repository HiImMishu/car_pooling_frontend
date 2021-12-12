import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080/api'

const registerUser = async (payload) => {
    return await axios.post(`${BASE_URL}/auth/register`, mapUserRegistrationBody(payload))
        .then(res => {
            return {
                response: res.status
            }
        })
        .catch(err => {
            if (err?.response?.status) {
                return {
                    response: err.response.status
                }
            } else {
                return {
                    response: -1
                }
            }
        })
}

const loginUser = async (payload) => {
    return await axios.post(`${BASE_URL}/auth/login`, {email: payload.email, password: payload.password})
    .then(res => {
        return {
            token: res.data.access_token,
            status: res.status
        }
    })
    .catch(err => {
        return {
            status: err.response.status
        }
    })
}

const fetchUser = async (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.get(`${BASE_URL}/users`, config)
        .then(res => {
            return {
                status: res.status,
                user: {...res.data}
            }
        })
        .catch(() => {
            return {
                status: 401
            }
        })
}

const fetchUserById = async (userId) => {
    return await axios.get(`${BASE_URL}/users/${userId}`)
        .then(res => {
            return {
                status: res.status,
                user: {...res.data}
            }
        })
        .catch(() => {
            return {
                status: 401
            }
        })
}

const updateUser = async (token, payload) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.put(`${BASE_URL}/users`, payload, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch((err) => {
            if (err?.response?.status) {
                return {
                    status: err.response.status
                }
            } else {
                return {
                    status: 401
                }
            }
        })
}

const updateRating = async (token, payload) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.put(`${BASE_URL}/ratings`, payload, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch((err) => {
            if (err?.response?.status) {
                return {
                    status: err.response.status
                }
            } else {
                return {
                    status: -1
                }
            }
        })
}

const addRating = async (token, payload) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.post(`${BASE_URL}/ratings`, payload, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch((err) => {
            if (err?.response?.status) {
                return {
                    status: err.response.status
                }
            } else {
                return {
                    status: -1
                }
            }
        })
}

const dismissNotification = async (token, notificationId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.put(`${BASE_URL}/notifications/${notificationId}`, {id: notificationId, isRead: true}, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch((err) => {
            if (err?.response?.status) {
                return {
                    status: err.response.status
                }
            } else {
                return {
                    status: -1
                }
            }
        })
}

const fetchInitialMessages = async (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.get(`${BASE_URL}/messages`, config)
        .then(res => {
            return {
                status: res.status,
                messages: res.data
            }
        })
        .catch((err) => {
            if (err?.response?.status) {
                return {
                    status: err.response.status
                }
            } else {
                return {
                    status: -1
                }
            }
        })
}

const fetchPageOfMessages = async (token, id, size, number) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.get(`${BASE_URL}/messages/${id}?size=${size}&number=${number}`, config)
        .then(res => {
            return {
                status: res.status,
                messages: res.data
            }
        })
        .catch((err) => {
            if (err?.response?.status) {
                return {
                    status: err.response.status
                }
            } else {
                return {
                    status: -1
                }
            }
        })
}

const mapUserRegistrationBody = (payload) => {
    return {
        firstName: payload.firstName,
        lastName: payload.lastName,
        birthday: new Date(payload.birthDate).getTime(),
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        password: payload.password,
        car: payload.car,
        carColor: payload.carColor,
        emptyThirdSeat: payload.addInfo[0].checked,
        noSmoking: payload.addInfo[1].checked,
        noAnimals: payload.addInfo[2].checked,
        talkative: payload.addInfo[3].checked,
        music: payload.addInfo[4].checked,
        autoAccept: payload.addInfo[5].checked
    }
}

const userApi = {
    registerUser,
    loginUser,
    fetchUser,
    updateUser,
    fetchUserById,
    updateRating,
    addRating,
    dismissNotification,
    fetchInitialMessages,
    fetchPageOfMessages
}

export default userApi