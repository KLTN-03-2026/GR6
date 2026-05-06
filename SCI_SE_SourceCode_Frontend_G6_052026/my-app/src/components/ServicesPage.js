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

  // States quản lý dữ liệu
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [displayServices, setDisplayServices] = useState([]);
  const [activeParentId, setActiveParentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceImages, setServiceImages] = useState([]);

  // AI Assistant States
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantSuggestions, setAssistantSuggestions] = useState([]);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantError, setAssistantError] = useState('');
  const [assistantEmptyHint, setAssistantEmptyHint] = useState(false);
  const [isOverLimit, setIsOverLimit] = useState(false);

  // Chatbot States 
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(() => {
    const savedChat = localStorage.getItem('heli_chat_history');
    return savedChat ? JSON.parse(savedChat) : [
      { role: 'bot', text: 'Chào bạn! Mình là Heli, trợ lý ảo của ServiceHub. Mình có thể giúp gì cho bạn hôm nay?', type: 'text' }
    ];
  });
  const [isTyping, setIsTyping] = useState(false);

  // Modal xác nhận xóa
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem('heli_chat_history', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Load dữ liệu
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

  // Helpers
  const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  const parseDonGia = (raw) => {
    if (raw == null || raw === '') return 0;
    if (typeof raw === 'number') return raw;
    const n = Number(String(raw).replace(/[^\d.-]/g, ''));
    return isNaN(n) ? 0 : n;
  };
  const formatRating = (v) => isNaN(Number(v)) ? '—' : Number(v).toFixed(1);

  // Xử lý AI Assistant
  const handleAssistantSubmit = async () => {
    const q = assistantQuery.trim();
    if (!q || assistantLoading || q.length > 300) return;
    const hasAlphaNumeric = /[\p{L}\p{N}]/u.test(q);
    if (!hasAlphaNumeric) {
      setAssistantSuggestions([]);
      setAssistantEmptyHint(true);
      return;
    }

    setAssistantLoading(true);
    setAssistantError('');
    setAssistantSuggestions([]);
    setAssistantEmptyHint(false);

    try {
      const res = await api.post('ai/assistant', { keyword: q });
      if (res.data?.ok && Array.isArray(res.data.data)) {
        const results = res.data.data;
        setAssistantSuggestions(results);
        if (results.length === 0) setAssistantEmptyHint(true);
      }
    } catch (err) {
      setAssistantError('Lỗi kết nối. Vui lòng thử lại sau.');
    } finally {
      setAssistantLoading(false);
    }
  };

  // Xử lý Chatbot Heli 
  const handleSendMessage = async () => {
    const msg = chatInput.trim();
    if (!msg || isTyping) return;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const hasAlphaNumeric = /[\p{L}\p{N}]/u.test(msg);

    if (urlRegex.test(msg) || !hasAlphaNumeric) {
      setChatMessages(prev => [...prev,
      { role: 'user', text: msg, type: 'text' },
      { role: 'bot', text: 'Heli không hỗ trợ xử lý liên kết hoặc ký tự lạ. Hãy trò chuyện với mình bằng chữ nhé!', type: 'text' }
      ]);
      setChatInput('');
      return;
    }

    const userMsg = { role: 'user', text: msg, type: 'text' };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const history = chatMessages.slice(-5).map(m => ({
        role: m.role === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const res = await api.post('ai/chat', { message: msg, history: history });

      if (res.data?.ok) {
        const services = res.data.data || [];

        if (res.data.type === 'search_result' && services.length === 0) {
          setChatMessages(prev => [...prev, {
            role: 'bot',
            text: `Heli đã thử tìm kiếm "${chatInput}" nhưng hiện tại không có dịch vụ nào phù hợp. Bạn thử mô tả khác xem sao nhé!`,
            type: 'text'
          }]);
        } else {
          setChatMessages(prev => [...prev, {
            role: 'bot',
            text: res.data.text,
            type: res.data.type,
            services: services
          }]);
        }
      } else {
        const errorMsg = res.data?.error || '';
        let friendlyText = "Heli đang bận một chút, bạn thử lại sau vài giây nhé!";
        if (errorMsg.includes('quota') || errorMsg.includes('limit')) {
          friendlyText = "Heli đang bận một chút. Bạn vui lòng đợi khoảng 30 giây rồi hỏi lại nhé! ⏳";
        }
        setChatMessages(prev => [...prev, { role: 'bot', text: friendlyText, type: 'text' }]);
      }
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Heli không kết nối được với hệ thống. Bạn kiểm tra lại mạng nhé!', type: 'text' }]);
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
      {/* GLOBAL TOAST XÁC NHẬN PHỦ PHÍA TRÊN */}
      {showDeleteConfirm && (
        <div className="global-toast-overlay">
          <div className="global-toast">
            <div className="toast-content">
              <span className="toast-icon">⚠️</span>
              <div className="toast-text">
                <p><strong>Xác nhận xóa</strong></p>
                <p>Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện không?</p>
              </div>
            </div>
            <div className="toast-actions">
              <button className="btn-no" onClick={() => setShowDeleteConfirm(false)}>Hủy</button>
              <button className="btn-yes" onClick={() => {
                setChatMessages([{ role: 'bot', text: 'Chào bạn! Mình là Heli, trợ lý ảo của ServiceHub. Mình có thể giúp gì cho bạn hôm nay?', type: 'text' }]);
                localStorage.removeItem('heli_chat_history');
                setShowDeleteConfirm(false);
              }}>Xóa ngay</button>
            </div>
          </div>
        </div>
      )}

      <section className="hero-section">
        <h1>Dịch vụ chuyên nghiệp dành cho bạn</h1>
        <p>Khám phá hàng ngàn dịch vụ chất lượng cao được tuyển chọn.</p>
      </section>

      {/* AI ASSISTANT SECTION */}
      <section className="assistant-card">
        <div className="assistant-header">
          <Sparkles size={16} fill="currentColor" />
          <span>AI ASSISTANT</span>
        </div>
        <div className="assistant-prompt">Trợ lý ServiceHub gợi ý cho bạn</div>
        <p className="assistant-welcome-text">Chào bạn, tôi sẽ gợi ý các dịch vụ phù hợp nhất với yêu cầu của bạn!</p>

        <div className="assistant-input-wrap">
          <input
            type="text"
            placeholder="Gợi ý cho tôi..."
            value={assistantQuery}
            onChange={(e) => {
              const val = e.target.value;
              setAssistantQuery(val);
              setIsOverLimit(val.length > 300);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && assistantQuery.length <= 300) handleAssistantSubmit();
            }}
            disabled={assistantLoading}
            style={{ borderColor: isOverLimit ? '#ef4444' : '#cddaf0' }}
          />
          <button onClick={handleAssistantSubmit} disabled={assistantLoading || !assistantQuery.trim() || isOverLimit}>
            <Send size={16} />
          </button>
        </div>

        {isOverLimit && (
          <p className="assistant-error" style={{ fontSize: '0.8rem', marginTop: '5px' }}>
            ⚠️ Bạn đã nhập quá 300 ký tự. Vui lòng rút ngắn nội dung để Heli có thể xử lý tốt nhất.
          </p>
        )}

        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: isOverLimit ? '#ef4444' : '#94a3b8', marginTop: '5px' }}>
          {assistantQuery.length}/300
        </div>

        {assistantLoading && <p className="assistant-status">Đang tìm kiếm cho bạn...</p>}

        {!assistantLoading && assistantEmptyHint && (
          <div className="assistant-error" style={{ background: '#fff5f5', padding: '12px', borderRadius: '12px', marginTop: '15px', border: '1px solid #feb2b2' }}>
            <p style={{ margin: 0, fontWeight: 700, color: '#c53030' }}>😞 Rất tiếc, không tìm thấy dịch vụ nào phù hợp.</p>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#744242' }}>Bạn hãy thử nhập từ khóa khác hoặc mô tả chi tiết hơn nhé!</p>
          </div>
        )}

        {assistantError && <p className="assistant-error">{assistantError}</p>}

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

      {/* CATEGORY & SERVICES GRID */}
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
              <div className="service-bottom"><span className="service-price">{formatPrice(service.don_gia)}</span></div>
            </div>
          </article>
        ))}
      </section>

      {/* CHATBOT HELI */}
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
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span onClick={() => setShowDeleteConfirm(true)} style={{ cursor: 'pointer', fontSize: '12px', opacity: 0.8 }}>Xóa chat</span>
              <X size={18} style={{ cursor: 'pointer' }} onClick={() => setIsChatOpen(false)} />
            </div>
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