import axios from "axios";
import Auth from "../security/AuthContext";
const apiClient = axios.create(
    {
        // baseURL:"http://192.168.43.1:8080"
        baseURL:"http://localhost:8080"
        // baseURL:"https://todomanagementapplication-backend.onrender.com"
    }
);

// As we have enable spring security in our backend applicaiton we must have to send the authorization headers with this requests which enables frontend
// to access the backend service.
// Here we are passing an object as a second parameter to the get method which acts as an authorization headers. 
// This headers should be added in those methods to which you want to make the access available.



export const retrieveTodos = (token) => apiClient.get("/admin/getalltodos",{headers: {'Authorization':token }});

export const retrieveTodo = (id) => apiClient.get(`/todos/${id}`);

export const deleteTodoAPI = (token,todo) => apiClient.post(`/users/deletetodo`,todo,{headers: {'Authorization':token }});

export const updateTodoAPI = (token,todo) => apiClient.put(`/users/updatetodo`,todo,{headers: {'Authorization':token }});

export const addTodoAPI = (token,todo) => apiClient.post(`/users/addtodo`,todo,{headers: {'Authorization':token }});

export const setIsDoneAPI = (token,todo) => apiClient.put(`/users/setisdone`,todo,{headers: {'Authorization':token }});

export const BasicAuthentication = (token) => apiClient.get('/basicAuth',{ headers: { 'Authorization': 'Bearer ' + token } });

export const addUserTodo = (token,todo) => apiClient.post('/users/addusertodo',todo,{headers: {'Authorization':token }});

export const getUserTodo = (token,credentials) => apiClient.post('/users/getusertodos',credentials,{headers: {'Authorization':token }});

export const registerUserAPI = (user) => apiClient.post('/public/register',user);

export const loginAPI = (credentials) => apiClient.post('/public/login',credentials);

export const OTPAPI = (email) => apiClient.post('/public/otp-registration',email);

export const verifyOTP = (otp) => apiClient.get(`/public/verify-otp/${otp}`);

export const forgotPasswordAPI = (email) => apiClient.post('/public/otp-forgot',email);

export const resetPasswordAPI = (email,credentials) => apiClient.post('/public/reset-password',email,credentials);

export const checkUserAuthority = (token) => apiClient.get('/users',{headers: {'Authorization':token }});

export const checkAdminAuthority = (token) => apiClient.get('/admin',{headers: {'Authorization':token }});

export const checkEmail = (string) => apiClient.get(`/public/check-email/${string}`);

export const adminOTP = (credentials)=> apiClient.post('/public/send-adminotp',credentials);