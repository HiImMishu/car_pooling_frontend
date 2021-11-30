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
            return {
                response: err.response.status
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
        autoAccept: payload.addInfo[5].checked,
    }
}

export default {
    registerUser
}