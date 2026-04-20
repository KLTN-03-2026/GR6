import React, { useState, useEffect } from 'react';
import '../styles/ServicesPage.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { 
  Send, Sparkles, MessageCircle, X, Minus, Paperclip, ChevronRight 
} from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [displayServices, setDisplayServices] = useState([]);
  const [activeParentId, setActiveParentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceImages, setServiceImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [resCate, resServ,resImg] = await Promise.all([
          api.get('/danh-muc/get-data'),
          api.get('/dich-vu/get-data'),
          api.get('/hinh-anh-dich-vu/get-data-hinh-anh')
        ]);

        if (resCate.data.status) {
          const cateData = resCate.data.data;
          setParentCategories(cateData.filter(item => Number(item.id_father) === 0));
          setChildCategories(cateData.filter(item => Number(item.id_father) !== 0));
        }

        if (resServ.data.status) {
          const servData = resServ.data.data;
          setAllServices(servData);
          setDisplayServices(servData);
        }
        if (resImg.data.status) {
          console.log("ẢNH DATA:", resImg.data);
          setServiceImages(resImg.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    if (id === null) {
      setDisplayServices(allServices);
    } else {
      const filtered = allServices.filter(item => Number(item.id_danh_muc_dich_vu) === Number(id));
      setDisplayServices(filtered);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };
  const getImageByServiceId = (serviceId) => {
  const img = serviceImages.find(
    item => Number(item.id_dich_vu) === Number(serviceId)
  );
  return img ? img.hinh_anh : "https://via.placeholder.com/300";
  };

  return (
    <main className="services-main">
      <section className="hero-section">
        <h1>Dịch vụ chuyên nghiệp dành cho bạn</h1>
        <p>Khám phá hàng ngàn dịch vụ chất lượng cao được tuyển chọn.</p>
      </section>

      <section className="assistant-card">
        <div className="assistant-header">
          <Sparkles size={16} fill="currentColor" />
          <span>AI ASSISTANT</span>
        </div>
        <div className="assistant-prompt">Trợ lý ServiceHub gợi ý cho bạn</div>
        <div className="assistant-input-wrap">
          <input type="text" placeholder="Gợi ý cho tôi..." />
          <button><Send size={16} /></button>
        </div>
      </section>

      <section className="category-container">
        <div className="category-row">
          <span 
            className={`category-pill ${selectedCategoryId === null ? 'active' : ''}`}
            onClick={() => handleCategoryClick(null)}
          >
            Tất cả
          </span>
          
          {parentCategories.map((parent) => (
            <div 
              key={parent.id} 
              className="category-group"
              onMouseEnter={() => setActiveParentId(parent.id)}
              onMouseLeave={() => setActiveParentId(null)}
            >
              <span className={`category-pill ${activeParentId === parent.id ? 'active' : ''}`}>
                {parent.ten_dich_vu}
              </span>

              {activeParentId === parent.id && (
                <div className="category-dropdown">
                  {childCategories
                    .filter(child => Number(child.id_father) === parent.id)
                    .map(child => (
                      <div 
                        key={child.id} 
                        className="dropdown-item"
                        onClick={() => handleCategoryClick(child.id)}
                      >
                        <img src={child.hinh_anh} alt="" />
                        <div className="dropdown-text">
                            <span>{child.ten_dich_vu}</span>
                        </div>
                        <ChevronRight size={14} className="chevron-icon" />
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="services-grid">
        {isLoading ? (
          <div>Đang tải dữ liệu...</div>
        ) : displayServices.length > 0 ? (
          displayServices.map((service) => (
            <article key={service.id} className="service-card" onClick={() => navigate(`/chi-tiet/${service.id}`)}>
              <div className="service-thumb">
                <img src={getImageByServiceId(service.id)} alt="" />
                <div className="service-rating">4.8</div>
              </div>
              <div className="service-info">
                <h3>{service.ten_dich_vu}</h3>
                <p className="service-subtitle">{service.mo_ta_ngan}</p>
                <div className="service-bottom">
                  <span className="service-price">{formatPrice(service.don_gia)}</span>
                  <span className="service-tag">Chi tiết</span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="no-data">Không có dịch vụ nào trong danh mục này.</div>
        )}
      </section>

      <button className="chat-bubble" onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isChatOpen && (
        <div className="heli-chat-window">
          <div className="heli-header">
            <div className="heli-info">
              <div className="heli-avatar">🤖</div>
              <div className="heli-title">
                <h4>Heli – Trợ lý trực tuyến</h4>
              </div>
            </div>
            <X size={18} style={{cursor: 'pointer'}} onClick={() => setIsChatOpen(false)} />
          </div>
          <div className="heli-body">
            <div className="msg-row bot">
               <div className="msg-bubble">Chào bạn! Mình có thể giúp gì cho bạn hôm nay?</div>
            </div>
          </div>
          <div className="heli-input">
            <input 
              type="text" 
              placeholder="Nhập tin nhắn..." 
            />
            <button>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ServicesPage;