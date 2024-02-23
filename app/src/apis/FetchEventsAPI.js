import axios from "./Axios";

const FETCH_EVENTS_API_URL = "/api/events"

export const FetchEventsAPI = (onSuccess, onError, queryParams) => {

    axios({
        method: "get",
        url: FETCH_EVENTS_API_URL,
        params: queryParams,
    })
        .then((res) => {
            onSuccess(res.data)
        })
        .catch((error) => {
            onError(error);
        });
};
