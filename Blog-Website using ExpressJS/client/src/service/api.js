import axios from 'axios';
import { API_NOTIFICATION_MESSAGES } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';
import { SERVICE_URLS } from '../constants/config';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        "content-type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        return processResponse(response);
    },
    function(error) {
        return Promise.reject(ProcessError(error));
    }
);

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
};

const ProcessError = async (error) => {
    if (error.response) {
        if (error.response?.status === 403) {
            sessionStorage.clear();
        } else {
            console.log("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: API_NOTIFICATION_MESSAGES.responseFailure,
                code: error.response.status
            }
        }
    } else if (error.request) { 
        // The request was made but no response was received
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    } else { 
        // Something happened in setting up the request that triggered an Error
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
};
const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}
// import axios from 'axios';
// import { API_NOTIFICATION_MESSAGES } from '../constants/config';
// import { getAccessToken, getType } from '../utils/common-utils';

// const API_URL = 'http://localhost:8000';

// const axiosInstance = axios.create({
//     baseURL: API_URL,
//     timeout: 10000, 
//     headers: {
//         "content-type": "application/json"
//     }
// });

// axiosInstance.interceptors.request.use(
//     function(config) {
//         if (config.TYPE.params) {
//             config.params = config.TYPE.params
//         } else if (config.TYPE.query) {
//             config.url = config.url + '/' + config.TYPE.query;
//         }
//         return config;
//     },
//     function(error) {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     function(response) {
//         return processResponse(response);
//     },
//     function(error) {
//         return Promise.reject(ProcessError(error));
//     }
// );

// const processResponse = (response) => {
//     if (response?.status === 200) {
//         return { isSuccess: true, data: response.data }
//     } else {
//         return {
//             isFailure: true,
//             status: response?.status,
//             msg: response?.msg,
//             code: response?.code
//         }
//     }
// };

// const ProcessError = async (error) => {
//     if (error.response) {
//         if (error.response?.status === 403) {
//             sessionStorage.clear();
//         } else {
//             console.log("ERROR IN RESPONSE: ", error.toJSON());
//             return {
//                 isError: true,
//                 msg: API_NOTIFICATION_MESSAGES.responseFailure,
//                 code: error.response.status
//             }
//         }
//     } else if (error.request) { 
//         // The request was made but no response was received
//         console.log("ERROR IN RESPONSE: ", error.toJSON());
//         return {
//             isError: true,
//             msg: API_NOTIFICATION_MESSAGES.requestFailure,
//             code: ""
//         }
//     } else { 
//         // Something happened in setting up the request that triggered an Error
//         console.log("ERROR IN RESPONSE: ", error.toJSON());
//         return {
//             isError: true,
//             msg: API_NOTIFICATION_MESSAGES.networkError,
//             code: ""
//         }
//     }
// };

// const API = {
//     userLogin: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'POST',
//         url: '/login',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: '/login', method: 'POST' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     userSignup: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'POST',
//         url: '/signup',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: '/signup', method: 'POST' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     getAllPosts: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'GET',
//         url: '/posts',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: '/posts', method: 'GET' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     getRefreshToken: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'POST',
//         url: '/token',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: '/token', method: 'POST' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     uploadFile: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'GET',
//         url: 'file/upload',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: 'file/upload', method: 'GET' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     createPost: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'POST',
//         url: 'create',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: 'create', method: 'POST' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     deletePost: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'DELETE',
//         url: 'delete',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: 'delete', method: 'DELETE' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     getPostById: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'GET',
//         url: 'post',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: 'post', method: 'GET' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     newComment: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'POST',
//         url: '/comment/new',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: '/comment/new', method: 'POST' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     getAllComments: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'GET',
//         url: 'comments',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: '/comment/new', method: 'GET' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     deleteComment: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'DELETE',
//         url: 'comment/delete',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: 'comment/delete', method: 'DELETE' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     updatePost: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'PUT',
//         url: 'update',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: 'update', method: 'PUT' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),
//     sharedPost: (body, showUploadProgress, showDownloadProgress) => axiosInstance({
//         method: 'POST',
//         url: 'share',
//         data: body,
//         headers: {
//             authorization: getAccessToken(),
//         },
//         TYPE: getType({ url: 'share', method: 'POST' }, body),
//         onUploadProgress: function(progressEvent) {
//             if (showUploadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showUploadProgress(percentCompleted);
//             }
//         },
//         onDownloadProgress: function(progressEvent) {
//             if (showDownloadProgress) {
//                 let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//                 showDownloadProgress(percentCompleted);
//             }
//         }
//     }),

// };

// export { API };

export { API };