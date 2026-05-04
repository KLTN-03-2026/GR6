import './App.css';
import Header from './components/Header';
import HeaderNCC from './components/nhacungcap/HeaderNCC'; 
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

function App(props) {
  const location = useLocation();
  const userRole = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")).role : null; 
  const isLogin = !!localStorage.getItem("token");

  const hideLayoutRoutes = ["/dang-nhap", "/dang-ky", "/dang-ky-ncc", "/quen-mat-khau", "/admin/dang-nhap"];
  const isHideLayout = hideLayoutRoutes.includes(location.pathname);

  // 2. Hàm render Header linh hoạt
  const renderHeader = () => {
    if (isHideLayout) return null;
    if (isLogin && userRole === "nha_cung_cap") {
      return <HeaderNCC />;
    }
    return <Header />;
  };

  return (
    <div>
      {renderHeader()}
      
      <div className="w-full max-w-none px-0">
        {props.children}
      </div>

      {!isHideLayout && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default App;