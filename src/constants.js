import config from '../config';

function getQueryParams(qs) {
    const params = {};
    const re = /[?&]?([^=]+)=([^&]*)/g;
    let tokens;
    while (tokens = re.exec(qs.split('+').join(' '))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}

const QUERY_PARAMS = getQueryParams(window.location.search);
const CURRENT_USER = QUERY_PARAMS.userId;
const API_URL = config.API_URL;
const API_ENDPOINTS = {
    potentialRoommates: `${API_URL}/_ah/api/renthoopendpoint/v1/potentialroommate/${CURRENT_USER}`,
    like(userId) {
        return `${API_URL}/_ah/api/swipedendpoint/v1/likedinfo/${CURRENT_USER}/${userId}/true`;
    },
    dislike(userId) {
        return `${API_URL}/_ah/api/swipedendpoint/v1/dislikedinfo/${CURRENT_USER}/${userId}`;
    },
    userImage(userId) {
        return `https://graph.facebook.com/${userId}/picture?width=400&height=400`;
    },
    mutualFriends(userId) {
        return `${API_URL}/mutual/friends?sid=${CURRENT_USER}&rid=${userId}`;
    },
    mutualLikes(userId) {
        return `${API_URL}/mutual/likes?sid=${CURRENT_USER}&rid=${userId}`;
    },
    photos(userId) {
        return `${API_URL}/_ah/api/userinfoendpoint/v1/upload/${userId}`;
    },
    requestUpload: `${API_URL}/upload`,
    deletePhoto(uploadId) {
        return `${API_URL}/upload/${uploadId}`;
    },
};

export {
    QUERY_PARAMS,
    CURRENT_USER,
    API_URL,
    API_ENDPOINTS,
};
