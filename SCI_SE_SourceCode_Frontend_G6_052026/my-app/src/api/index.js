import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});

api.interceptors.request.use((config) => {
    const isAdminPath = config.url.includes('admin');
    const token = isAdminPath 
        ? localStorage.getItem("admin_access_token") 
        : localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
export const serviceApi = {
    // Tự động trả về dịch vụ của NCC tương ứng với Token trong Header
    getDichVu: () => api.get("dich-vu/get-data"),
    
    // Thêm mới (Backend tự lấy id_nha_cung_cap từ Token)
    create: (formData) => api.post("dich-vu/create", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Cập nhật (Cần truyền ID trong formData)
    update: (formData) => api.post("dich-vu/update", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    
    // Xóa theo ID
    delete: (id) => api.post(`dich-vu/delete/${id}`),
    
    // Thay đổi trạng thái (Toggle)
    changeStatus: (id) => api.post(`dich-vu/change-status/${id}`),
    
    // Lấy danh mục để đổ vào Select
    getDanhMuc: (id) => api.get(`dich-vu/get-thuong-hieu/${id}`)
};

// datlich
export const createDatLich = (payload) => api.post("khach-hang/dat-lich/create", payload);
export const getDataDatLich = () => api.get("khach-hang/dat-lich/getdata");
//ql khach hang
export const getCustomers = () => api.get("admin/customers");
export const getCustomerStats = () => api.get("admin/customers-count");
export const blockCustomer = (id) => api.get(`admin/customers/block/${id}`);
//ql nha cung cap
export const getProviders = () => api.get("admin/providers");
export const getProviderStats = () => api.get("admin/providers-count");
export const blockProvider = (id) => api.get(`admin/providers/block/${id}`);
//hinh anh dich vu
export const getHinhAnhDichVu = () => api.get("hinh-anh-dich-vu/get-data-hinh-anh");
export const getThuongHieus = (id) => api.get(`/dich-vu/get-thuong-hieu/${id}`);

export default api;