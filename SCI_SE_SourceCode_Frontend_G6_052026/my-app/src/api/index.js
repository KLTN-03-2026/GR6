import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("admin_access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Các hàm gọi API giữ nguyên bên dưới
export const getCustomers = () => api.get("admin/customers");
export const getCustomerStats = () => api.get("admin/customers-count");
export const blockCustomer = (id) => api.get(`admin/customers/block/${id}`);

export const getProviders = () => api.get("admin/providers");
export const getProviderStats = () => api.get("admin/providers-count");
export const blockProvider = (id) => api.get(`admin/providers/block/${id}`);

export const getHinhAnhDichVu = () => api.get("hinh-anh-dich-vu/get-data-hinh-anh");
export const getThuongHieus = (id) => api.get(`/dich-vu/get-nha-cung-cap/${id}`);

export default api;