import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
});
export const getHinhAnhDichVu = () => {
    return api.get("hinh-anh-dich-vu/get-data-hinh-anh");
};

export default api;