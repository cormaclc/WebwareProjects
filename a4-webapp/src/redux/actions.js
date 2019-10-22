import axios from 'axios'

export const fetchBeats = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API}/beats/`, { headers: { "Api-Key": process.env.REACT_APP_API_KEY}})
            .then(res => dispatch(getBeats(res.data)))
            .catch(err => console.log(err))
    }
};

export const getBeats = (beats) => {
    return {
        type: 'GET_BEATS',
            beats
    }
};