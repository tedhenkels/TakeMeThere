import axios from "./Axios";

const FETCH_EVENTS_API_URL = "/api/events"

export const FetchEventsAPI = (onSuccess, onError, queryParams) => {
    let url = FETCH_EVENTS_API_URL

    if (queryParams !== undefined) {
        const eventsQueryParams = new URLSearchParams(queryParams);
        url += `?${eventsQueryParams}`
    }

    axios({
        method: "get",
        url: url
    })
        .then((res) => onSuccess(res.data))
        .catch((error) => {
            onError(error);
        });
};
