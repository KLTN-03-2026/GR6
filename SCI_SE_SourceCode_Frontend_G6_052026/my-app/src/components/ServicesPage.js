import React, { useState, useEffect, useRef } from 'react';
import '../styles/ServicesPage.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
  Send, Sparkles, X, ChevronRight, Star
} from 'lucide-react';

const ASSISTANT_MAX_CARDS = 4;

const ServicesPage = () => {
  const navigate = useNavigate();

  // States quản lý dữ liệu
  const [parentCategories, setParentCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [displayServices, setDisplayServices] = useState([]);
  const [activeParentId, setActiveParentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceImages, setServiceImages] = useState([]);

  // --- LOGIC PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayServices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayServices.length / itemsPerPage);

  // Reset về trang 1 khi thay đổi danh mục hoặc kết quả tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [displayServices]);
  // ------------------------

  // AI Assistant States
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantSuggestions, setAssistantSuggestions] = useState([]);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantError, setAssistantError] = useState('');
  const [assistantEmptyHint, setAssistantEmptyHint] = useState(false);
  const [isOverLimit, setIsOverLimit] = useState(false);

  // Load dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [resCate, resServ, resImg, resRating] = await Promise.all([
          api.get('/danh-muc/get-data'),
          api.get('/dich-vu/get-data'),
          api.get('/hinh-anh-dich-vu/get-data-hinh-anh'),
          api.get('/danh-gia/tinh-diem-danh-gia')
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

        if (resRating.data.status) {
          console.log("Hệ thống:", resRating.data.message);
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
  const formatRating = (v) => isNaN(Number(v)) ? '0' : Number(v).toFixed(1);

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
        if (res.data.message === 'location_not_supported') {
          setAssistantSuggestions([]);
          setAssistantEmptyHint(false);
          setAssistantError('Hiện chưa hỗ trợ tìm kiếm theo định vị GPS. Bạn vui lòng nhập tên dịch vụ cụ thể nhé!');
          return;
        }
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

        {/* 1. CẢNH BÁO QUÁ 300 KÝ TỰ */}
        {isOverLimit && (
          <div className="assistant-error-container">
            <strong>⚠️ Giới hạn ký tự</strong>
            <p>Bạn đã nhập quá 300 ký tự. Vui lòng rút ngắn nội dung để xử lý tốt nhất.</p>
          </div>
        )}

        {/* 2. THÔNG BÁO LỖI HỆ THỐNG / GPS */}
        {assistantError && (
          <div className="assistant-error-container">
            <strong>{assistantError.includes('GPS') ? '📍 Thông báo vị trí' : '⚠️ Đã xảy ra lỗi'}</strong>
            <p>{assistantError}</p>
          </div>
        )}

        {/* 3. THÔNG BÁO KHÔNG TÌM THẤY DỊCH VỤ */}
        {!assistantLoading && assistantEmptyHint && (
          <div className="assistant-error-container">
            <strong>😞 Rất tiếc, không tìm thấy dịch vụ nào phù hợp.</strong>
            <p>Bạn hãy thử nhập từ khóa khác hoặc mô tả chi tiết hơn nhé!</p>
          </div>
        )}

        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: isOverLimit ? '#ef4444' : '#94a3b8', marginTop: '5px' }}>
          {assistantQuery.length}/300
        </div>

        {assistantLoading && <p className="assistant-status">Đang tìm kiếm cho bạn...</p>}

        {assistantSuggestions.length > 0 && (
          <div className="assistant-suggestions">
            {assistantSuggestions.slice(0, ASSISTANT_MAX_CARDS).map((item) => (
              <article key={item.id} className="service-card" onClick={() => navigate(`/chi-tiet/${item.id}`)}>
                <div className="service-thumb">
                  <img src={item.hinh_anh || 'https://via.placeholder.com/300'} alt="" />
                  <div className="service-rating">
                    <span>{formatRating(item.thuong_hieu?.diem_hai_long)}</span>
                    <Star size={12} fill="#ffc107" color="#ffc107" strokeWidth={1.5} />
                  </div>
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

      {/* CATEGORY CONTAINER */}
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

      {/* SERVICES GRID (Đã giới hạn currentItems) */}
      <section className="services-grid">
        {isLoading ? (
          <div>Đang tải...</div>
        ) : currentItems.length > 0 ? (
          currentItems.map(service => (
            <article key={service.id} className="service-card" onClick={() => navigate(`/chi-tiet/${service.id}`)}>
              <div className="service-thumb">
                <img src={getImageByServiceId(service.id)} alt="" />
                <div className="service-rating">
                  <span>{service.diem_hai_long}</span>
                  <Star size={12} fill="#ffc107" color="#ffc107" strokeWidth={1.5} />
                </div>
              </div>
              <div className="service-info">
                <h3>{service.ten_dich_vu}</h3>
                <div className="service-bottom">
                  <span className="service-price">{formatPrice(service.don_gia)}</span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="no-services-msg">Không có dịch vụ nào trong danh mục này.</div>
        )}
      </section>

      {/* PHÂN TRANG (PAGINATION) UI */}
      {totalPages > 1 && (
        <div className="pagination-wrapper" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px', paddingBottom: '40px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            Trang trước
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: currentPage === i + 1 ? '#3182ce' : '#fff',
                color: currentPage === i + 1 ? '#fff' : '#4a5568',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#fff',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Trang sau
          </button>
        </div>
      )}
    </main>
  );
};

export default ServicesPage;