import React, { useState, useEffect, useRef } from 'react';
import '../styles/ServicesPage.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { 
  Send, Sparkles, MessageCircle, X, Minus, Paperclip, ChevronRight 
} from 'lucide-react';

const ASSISTANT_MAX_CARDS = 4;

const ServicesPage = () => {
  const navigate = useNavigate();
  const chatBodyRef = useRef(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [displayServices, setDisplayServices] = useState([]);
  const [activeParentId, setActiveParentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceImages, setServiceImages] = useState([]);
  
  //AI Assistant
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantSuggestions, setAssistantSuggestions] = useState([]);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantError, setAssistantError] = useState('');
  const [assistantEmptyHint, setAssistantEmptyHint] = useState(false);

  //Chatbot
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Chào bạn! Mình là Heli, trợ lý ảo của ServiceHub. Mình có thể giúp gì cho bạn hôm nay?', type: 'text' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [resCate, resServ, resImg] = await Promise.all([
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

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  const parseDonGia = (raw) => {
    if (raw == null || raw === '') return 0;
    if (typeof raw === 'number') return raw;
    const n = Number(String(raw).replace(/[^\d.-]/g, ''));
    return isNaN(n) ? 0 : n;
  };
  const formatRating = (v) => isNaN(Number(v)) ? '—' : Number(v).toFixed(1);

  const handleAssistantSubmit = async () => {
    const q = assistantQuery.trim();
    if (!q || assistantLoading) return;
    setAssistantLoading(true);
    setAssistantError('');
    try {
      const res = await api.post('ai/assistant', { keyword: q }); 
      if (res.data?.ok && Array.isArray(res.data.data)) {
        setAssistantSuggestions(res.data.data);
        setAssistantEmptyHint(res.data.data.length === 0);
      }
    } catch (err) {
      setAssistantError('Lỗi kết nối.');
    } finally {
      setAssistantLoading(false);
    }
  };

  const handleSendMessage = async () => {
    const msg = chatInput.trim();
    if (!msg || isTyping) return;

    const userMsg = { role: 'user', text: msg, type: 'text' };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const history = chatMessages.slice(-5).map(m => ({
        role: m.role === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const res = await api.post('ai/chat', { 
        message: msg,
        history: history 
      });

      if (res.data?.ok) {
        setChatMessages(prev => [...prev, { 
          role: 'bot', 
          text: res.data.text, 
          type: res.data.type, 
          services: res.data.data || [] 
        }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Heli đang gặp chút sự cố, bạn thử lại sau nhé!', type: 'text' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getImageByServiceId = (serviceId) => {
    const img = serviceImages.find(item => Number(item.id_dich_vu) === Number(serviceId));
    return img ? img.hinh_anh : "https://via.placeholder.com/300";
  };

  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
    if (id === null) setDisplayServices(allServices);
    else setDisplayServices(allServices.filter(item => Number(item.id_danh_muc_dich_vu) === Number(id)));
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
          <input
            type="text"
            placeholder="Gợi ý cho tôi..."
            value={assistantQuery}
            onChange={(e) => setAssistantQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAssistantSubmit()}
            disabled={assistantLoading}
          />
          <button onClick={handleAssistantSubmit} disabled={assistantLoading || !assistantQuery.trim()}>
            <Send size={16} />
          </button>
        </div>
        {assistantLoading && <p className="assistant-status">Đang tải gợi ý…</p>}
        {assistantSuggestions.length > 0 && (
          <div className="assistant-suggestions">
            {assistantSuggestions.slice(0, ASSISTANT_MAX_CARDS).map((item) => (
              <article key={item.id} className="service-card" onClick={() => navigate(`/chi-tiet/${item.id}`)}>
                <div className="service-thumb">
                  <img src={item.hinh_anh || 'https://via.placeholder.com/300'} alt="" />
                  <div className="service-rating">{formatRating(item.thuong_hieu?.diem_hai_long)}</div>
                </div>
                <div className="service-info">
                  <h3>{item.ten_dich_vu}</h3>
                  <div className="service-bottom">
                    <span className="service-price">{formatPrice(parseDonGia(item.don_gia))}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="category-container">
        <div className="category-row">
          <span className={`category-pill ${selectedCategoryId === null ? 'active' : ''}`} onClick={() => handleCategoryClick(null)}>Tất cả</span>
          {parentCategories.map((parent) => (
            <div key={parent.id} className="category-group" onMouseEnter={() => setActiveParentId(parent.id)} onMouseLeave={() => setActiveParentId(null)}>
              <span className={`category-pill ${activeParentId === parent.id ? 'active' : ''}`}>{parent.ten_dich_vu}</span>
              {activeParentId === parent.id && (
                <div className="category-dropdown">
                  {childCategories.filter(child => Number(child.id_father) === parent.id).map(child => (
                    <div key={child.id} className="dropdown-item" onClick={() => handleCategoryClick(child.id)}>
                      <img src={child.hinh_anh} alt="" />
                      <span>{child.ten_dich_vu}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="services-grid">
        {isLoading ? <div>Đang tải...</div> : displayServices.map(service => (
          <article key={service.id} className="service-card" onClick={() => navigate(`/chi-tiet/${service.id}`)}>
            <div className="service-thumb">
              <img src={getImageByServiceId(service.id)} alt="" />
              <div className="service-rating">4.8</div>
            </div>
            <div className="service-info">
              <h3>{service.ten_dich_vu}</h3>
              <div className="service-bottom">
                <span className="service-price">{formatPrice(service.don_gia)}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <button className="chat-bubble" onClick={() => setIsChatOpen(!isChatOpen)}>
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isChatOpen && (
        <div className="heli-chat-window">
          <div className="heli-header">
            <div className="heli-info">
              <div className="heli-avatar">🤖</div>
              <div className="heli-title"><h4>Heli – Trợ lý trực tuyến</h4></div>
            </div>
            <X size={18} style={{cursor: 'pointer'}} onClick={() => setIsChatOpen(false)} />
          </div>

          <div className="heli-body" ref={chatBodyRef}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`msg-row ${msg.role === 'bot' ? 'bot' : 'user'}`}>
                <div className="msg-bubble">
                  {msg.text}
                  {msg.type === 'search_result' && msg.services?.length > 0 && (
                    <div className="chat-services-list">
                      {msg.services.map(s => (
                        <div key={s.id} className="chat-service-mini-card" onClick={() => navigate(`/chi-tiet/${s.id}`)}>
                          <img src={s.hinh_anh || 'https://via.placeholder.com/300'} alt="" />
                          <div className="mini-card-info">
                            <p className="mini-title">{s.ten_dich_vu}</p>
                            <p className="mini-price">{formatPrice(parseDonGia(s.don_gia))}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && <div className="msg-row bot"><div className="msg-bubble">Heli đang xử lý...</div></div>}
          </div>

          <div className="heli-input">
            <input 
              type="text" 
              placeholder="Hỏi Heli điều gì đó..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} disabled={isTyping}><Send size={16} /></button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ServicesPage;