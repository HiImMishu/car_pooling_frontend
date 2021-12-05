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

const tripApi = {
    postTrip
}

export default tripApi