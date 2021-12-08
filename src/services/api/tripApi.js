import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080/api'

const postTrip = async (token, payload) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.post(`${BASE_URL}/trips`, mapTripToBody(payload), config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(err => {
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

const updateTrip = async (token, payload) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.put(`${BASE_URL}/trips/${payload.id}`, mapTripToUpdateBody(payload), config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(err => {
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

const fetchOwnedTrips = async (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.get(`${BASE_URL}/trips/owned`, config)
        .then(res => {
            return {
                status: res.status,
                ownedTrips: res.data
            }
        })
        .catch(err => {
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

const fetchEnrolledTrips = async (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.get(`${BASE_URL}/trips/enrolled`, config)
        .then(res => {
            return {
                status: res.status,
                enrolledTrips: res.data
            }
        })
        .catch(err => {
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

const fetchTripById = async (tripId) => {
    return await axios.get(`${BASE_URL}/trips/${tripId}`)
        .then(res => {
            return {
                status: res.status,
                trip: res.data
            }
        })
        .catch(err => {
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

const deleteTrip = async (token, tripId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.delete(`${BASE_URL}/trips/${tripId}`, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(err => {
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

const enrollToTrip = async (token, tripId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.post(`${BASE_URL}/trips/${tripId}/enrollments`, null, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(err => {
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

const resignFromTrip = async (token, tripId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.delete(`${BASE_URL}/trips/${tripId}/enrollments`, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(err => {
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


const acceptUserEnrollment = async (token, tripId, userId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.put(`${BASE_URL}/trips/${tripId}/enrollments/${userId}`, null, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(err => {
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

const rejectUserEnrollment = async (token, tripId, userId) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.delete(`${BASE_URL}/trips/${tripId}/enrollments/${userId}`, config)
        .then(res => {
            return {
                status: res.status
            }
        })
        .catch(err => {
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

const fetchPastTrips = async (token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return await axios.get(`${BASE_URL}/trips/past-taken`, config)
        .then(res => {
            return {
                status: res.status,
                pastTrips: res.data
            }
        })
        .catch(err => {
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

const mapTripToBody = (payload) => ({
    startingPlace: payload.tripStartPlace,
    endingPlace: payload.tripEndPlace,
    additionalStops: payload.tripStops,
    tripDates: payload.tripDates,
    allSeats: payload.tripSeats,
    costPerSeat: payload.costPerSeat,
    description: payload.tripDescription,
    emptyThirdSeat: payload.tripAddInfo[0].checked,
    noSmoking: payload.tripAddInfo[1].checked,
    noAnimals: payload.tripAddInfo[2].checked,
    talkative: payload.tripAddInfo[3].checked,
    music: payload.tripAddInfo[4].checked,
    autoAccept: payload.tripAddInfo[5].checked
})

const mapTripToUpdateBody = (payload) => ({
    id: payload.id,
    startingPlace: payload.tripStartPlace,
    endingPlace: payload.tripEndPlace,
    additionalStops: payload.tripStops,
    tripDate: payload.tripDate,
    allSeats: payload.tripSeats,
    costPerSeat: payload.costPerSeat,
    description: payload.tripDescription,
    emptyThirdSeat: payload.tripAddInfo[0].checked,
    noSmoking: payload.tripAddInfo[1].checked,
    noAnimals: payload.tripAddInfo[2].checked,
    talkative: payload.tripAddInfo[3].checked,
    music: payload.tripAddInfo[4].checked,
    autoAccept: payload.tripAddInfo[5].checked
})


const tripApi = {
    postTrip,
    fetchOwnedTrips,
    fetchTripById,
    updateTrip,
    fetchEnrolledTrips,
    deleteTrip,
    enrollToTrip,
    resignFromTrip,
    acceptUserEnrollment,
    rejectUserEnrollment,
    fetchPastTrips
}

export default tripApi