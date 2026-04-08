import './App.css';
import ServicesPage from './components/ServicesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
function App(props) {
  const location = useLocation();
  const hideLayoutRoutes = ["/dang-nhap", "/dang-ky","/nha-cung-cap","/dang-ky-ncc","/quen-mat-khau"];
  const isHideLayout = hideLayoutRoutes.includes(location.pathname);
  return (
    <div>
    {!isHideLayout && <Header />} 
    <div className="w-full max-w-none px-0">
      {props.children}
    </div>
    {!isHideLayout && <Footer />}
    <ToastContainer />
    </div>
  );
}

export default App;
