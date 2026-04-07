import React, { useState } from 'react';
import '../styles/ServicesPage.css';
import { Send, Star, Sparkles, MessageCircle, X, Minus, Paperclip } from 'lucide-react';

const services = [
  { id: 1, title: 'Cắt tóc nam', subtitle: 'Hơn 200 lượt đặt', price: '150.000 VND', rating: 4.8, img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600' },
  { id: 2, title: 'Dọn dẹp nhà cửa', subtitle: 'Dịch vụ phổ biến nhất', price: '200.000 VND', rating: 4.9, img: 'https://images.unsplash.com/photo-1581574204868-6e19d6b8acfc?w=600' },
  { id: 3, title: 'Sửa điều hòa', subtitle: 'Thợ chuyên nghiệp', price: '350.000 VND', rating: 4.7, img: 'https://images.unsplash.com/photo-1581091012184-2ff710bd895e?w=600' },
  { id: 4, title: 'Chăm sóc thú cưng', subtitle: 'Yêu thương động vật', price: '120.000 VND', rating: 4.5, img: 'https://images.unsplash.com/photo-1555685812-4b7437d4b9f6?w=600' },
  { id: 5, title: 'Tập Gym cá nhân', subtitle: 'HLV 1 kèm 1', price: '500.000 VND', rating: 5.0, img: 'https://images.unsplash.com/photo-1554284126-3f1481f25cc2?w=600' },
  { id: 6, title: 'Trang điểm dự tiệc', subtitle: 'Đẹp tự nhiên', price: '800.000 VND', rating: 4.9, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600' },
  { id: 7, title: 'Giặt ủi cao cấp', subtitle: 'Giao nhận tận nơi', price: '100.000 VND', rating: 4.6, img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b9?w=600' },
  { id: 8, title: 'Thông tắc bồn cầu', subtitle: 'Có mặt sau 15 phút', price: '300.000 VND', rating: 4.4, img: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=600' },
];

const categories = ['Tất cả', 'Làm đẹp', 'Sửa chữa', 'Gia đình', 'Thú cưng', 'Thể thao', 'Giáo dục', 'Vận chuyển'];

const ServicesPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="services-main">
      {/* Banner & Hero */}
      <section className="hero-section">
        <h1>Dịch vụ chuyên nghiệp dành cho bạn</h1>
        <p>Khám phá hàng ngàn dịch vụ chất lượng cao được tuyển chọn.</p>
      </section>

      {/* AI Suggestion Card */}
      <section className="assistant-card">
        <div className="assistant-header">
          <Sparkles size={16} fill="currentColor" />
          <span>AI ASSISTANT</span>
        </div>
        <div className="assistant-prompt">Trợ lý ServiceHub gợi ý cho bạn</div>
        <blockquote>“Hãy gợi ý cho tôi cửa nhuộm tóc đẹp”</blockquote>
        <div className="assistant-input-wrap">
          <input type="text" placeholder="Gợi ý cho tôi..." />
          <button><Send size={16} /></button>
        </div>
      </section>

      {/* Categories */}
      <section className="category-row">
        {categories.map((category) => (
          <span key={category} className="category-pill">{category}</span>
        ))}
      </section>

      {/* Services Grid */}
      <section className="services-grid">
        {services.map((service) => (
          <article key={service.id} className="service-card">
            <div className="service-thumb">
              <img src={service.img} alt={service.title} />
              <div className="service-rating">{service.rating.toFixed(1)}</div>
            </div>
            <div className="service-info">
              <h3>{service.title}</h3>
              <p className="service-subtitle">{service.subtitle}</p>
              <div className="service-bottom">
                <span className="service-price">{service.price}</span>
                <span className="service-tag">Chi tiết</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* --- PHẦN CHATBOT HELI --- */}
      
      {/* Nút bong bóng chat */}
      <button 
        className="chat-bubble" 
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Mở trợ lý Heli"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Cửa sổ Chat Heli */}
      {isChatOpen && (
        <div className="heli-chat-window">
          <div className="heli-header">
            <div className="heli-info">
              <div className="heli-avatar-status">
                <div className="heli-avatar">🤖</div>
                <span className="status-dot"></span>
              </div>
              <div className="heli-title">
                <h4>Heli – Trợ lý trực tuyến</h4>
                <span>Đang hoạt động</span>
              </div>
            </div>
            <div className="heli-controls">
              <button className="control-btn"><Minus size={16} /></button>
              <button className="control-btn" onClick={() => setIsChatOpen(false)}><X size={16} /></button>
            </div>
          </div>

          <div className="heli-body">
            <div className="msg-time">10:42 AM</div>
            
            <div className="msg-row user">
              <div className="msg-bubble">
                Tui muốn biết cách dùng VNPAY để thanh toán dịch vụ Spa.
              </div>
            </div>

            <div className="msg-row bot">
              <div className="bot-identity">
                <span className="bot-icon">🤖</span>
                <span className="bot-name">Heli</span>
              </div>
              <div className="msg-bubble">
                <p>Chào Thủy Tiên! Để thanh toán qua VNPAY cho các dịch vụ Spa trên ServiceHub, bà chỉ cần làm theo 3 bước sau nè:</p>
                <ol className="step-list">
                  <li>
                    <span className="step-number">1</span>
                    <p>Tại bước xác nhận đặt lịch, bà chọn phương thức <strong>Thanh toán VNPAY</strong>.</p>
                  </li>
                  <li>
                    <span className="step-number">2</span>
                    <p>Hệ thống sẽ chuyển sang giao diện VNPAY, bà có thể quét mã QR hoặc nhập thông tin thẻ ngân hàng.</p>
                  </li>
                  <li>
                    <span className="step-number">3</span>
                    <p>Sau khi xác nhận OTP thành công, lịch hẹn của bà sẽ được cập nhật trạng thái.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="heli-footer">
            <div className="input-wrapper">
              <input type="text" placeholder="Nhập câu hỏi cho Heli..." />
              <div className="input-actions">
                <button className="action-btn"><Paperclip size={18} /></button>
                <button className="send-btn"><Send size={16} /></button>
              </div>
            </div>
            <div className="footer-note">Sử dụng AI để hỗ trợ phản hồi nhanh hơn</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ServicesPage;