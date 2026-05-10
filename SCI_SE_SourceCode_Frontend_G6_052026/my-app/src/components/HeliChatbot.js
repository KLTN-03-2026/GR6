import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import { Send, MessageCircle, X, Sparkles } from 'lucide-react';
import '../styles/HeliChatbot.css';
import ReactMarkdown from 'react-markdown';

const HeliChatbot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const chatBodyRef = useRef(null);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [chatMessages, setChatMessages] = useState(() => {
        const savedChat = localStorage.getItem('heli_chat_history');
        return savedChat ? JSON.parse(savedChat) : [
            { role: 'bot', text: 'Chào bạn! Mình là Heli, trợ lý ảo của ServiceHub. Mình có thể giúp gì cho bạn hôm nay?', type: 'text' }
        ];
    });

    // Danh sách FAQ 
    const QUICK_FAQS = [
        {
            keywords: ['còn chỗ', 'trống lịch', 'giờ trống'],
            answer: "Lịch hiển thị trên web là thời gian thực. Những khung giờ bạn thấy có thể chọn đều là những khung giờ còn trống bạn nhé! 😊"
        },
        {
            keywords: ['đánh giá', 'review', 'bình luận'],
            answer: "Mỗi shop ảo đều có phần đánh giá và bình luận từ khách trước đó. Bạn nên kiểm tra mục này trong trang chi tiết dịch vụ để có cái nhìn khách quan nhất."
        },
        {
            keywords: ['quên mật khẩu', 'lấy lại mật khẩu', 'đổi mật khẩu'],
            answer: "Bạn chỉ cần nhấn 'Quên mật khẩu' tại trang đăng nhập, hệ thống sẽ gửi mã OTP xác thực về số điện thoại hoặc email bạn đã đăng ký để thiết lập lại nhé."
        },
        {
            keywords: ['địa chỉ', 'ở đâu', 'văn phòng'],
            answer: "Số điện thoại của bạn chỉ được cung cấp cho duy nhất chủ shop bạn đã đặt lịch để họ liên hệ xác nhận hoặc đón tiếp. Bạn hoàn toàn yên tâm về bảo mật nhé!"
        }
    ];

    useEffect(() => {
        localStorage.setItem('heli_chat_history', JSON.stringify(chatMessages));
    }, [chatMessages]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatMessages, isTyping]);

    const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + ' VND';

    const parseDonGia = (raw) => {
        if (!raw) return 0;
        const n = Number(String(raw).replace(/[^\d.-]/g, ''));
        return isNaN(n) ? 0 : n;
    };

    // Hàm xử lý gửi tin nhắn chính
    const handleSendMessage = async (overrideMsg = null) => {
        const msg = overrideMsg ? overrideMsg.trim() : chatInput.trim();
        if (!msg || isTyping) return;

        // 1. Chặn chuỗi chỉ có số
        if (/^\d+$/.test(msg)) {
            setChatMessages(prev => [...prev,
            { role: 'user', text: msg },
            { role: 'bot', text: 'Heli không thể tìm kiếm dịch vụ chỉ bằng mã số. Bạn vui lòng nhập tên dịch vụ (ví dụ: cắt tóc, massage) nhé! 😊' }
            ]);
            if (!overrideMsg) setChatInput('');
            return;
        }

        // 2. Chặn từ khóa vị trí (GPS)
        const locationKeywords = ['gần đây', 'gần tôi', 'gần nhất', 'xung quanh'];
        if (locationKeywords.some(keyword => msg.toLowerCase().includes(keyword))) {
            setChatMessages(prev => [...prev,
            { role: 'user', text: msg },
            { role: 'bot', text: 'Heli hiện chưa hỗ trợ GPS nên chưa thể tìm chính xác các dịch vụ ở gần bạn. Bạn hãy nhập tên dịch vụ cụ thể nhé!' }
            ]);
            if (!overrideMsg) setChatInput('');
            return;
        }

        // 3. Chặn Link và ký tự đặc biệt rác
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const hasAlphaNumeric = /[\p{L}\p{N}]/u.test(msg);
        if (urlRegex.test(msg) || !hasAlphaNumeric) {
            setChatMessages(prev => [...prev,
            { role: 'user', text: msg },
            { role: 'bot', text: 'Heli không hỗ trợ xử lý liên kết hoặc ký tự lạ. Hãy trò chuyện bằng văn bản nhé!' }
            ]);
            if (!overrideMsg) setChatInput('');
            return;
        }

        // 4. Kiểm tra FAQ
        const msgLower = msg.toLowerCase();
        const foundFAQ = QUICK_FAQS.find(faq =>
            faq.keywords.some(key => msgLower.includes(key))
        );

        if (foundFAQ) {
            setChatMessages(prev => [...prev,
            { role: 'user', text: msg },
            { role: 'bot', text: foundFAQ.answer, type: 'text' }
            ]);
            if (!overrideMsg) setChatInput('');
            return;
        }

        const userMsg = { role: 'user', text: msg, type: 'text' };
        setChatMessages(prev => [...prev, userMsg]);
        if (!overrideMsg) setChatInput('');
        setIsTyping(true);

        try {
            const history = chatMessages.slice(-5).map(m => ({
                role: m.role === 'bot' ? 'model' : 'user',
                parts: [{ text: m.text }]
            }));

            const res = await api.post('ai/chat', { message: msg, history: history });

            if (res.data?.ok) {
                if (res.data.message === 'location_not_supported') {
                    setChatMessages(prev => [...prev, {
                        role: 'bot',
                        text: "Hiện mình chưa được tích hợp GPS. Bạn muốn mình gợi ý các dịch vụ chất lượng nhất không?",
                        type: 'text'
                    }]);
                } else {
                    const services = res.data.data || [];
                    if (res.data.type === 'search_result' && services.length === 0) {
                        setChatMessages(prev => [...prev, {
                            role: 'bot',
                            text: `Heli đã thử tìm kiếm "${msg}" nhưng không thấy dịch vụ phù hợp. Bạn thử mô tả khác nhé!`,
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
                }
            }
        } catch (error) {
            setChatMessages(prev => [...prev, { role: 'bot', text: 'Heli đang bận, bạn thử lại sau nhé!', type: 'text' }]);
        } finally {
            setIsTyping(false);
        }
    };

    if (location.pathname.startsWith('/admin')) return null;

    return (
        <>
            {showDeleteConfirm && (
                <div className="global-toast-overlay">
                    <div className="global-toast">
                        <div className="toast-content">
                            <span className="toast-icon">⚠️</span>
                            <div className="toast-text">
                                <p><strong>Xác nhận xóa</strong></p>
                                <p>Bạn có chắc muốn xóa lịch sử trò chuyện không?</p>
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
                        {chatMessages.length === 1 && (
                            <div className="quick-suggestions" style={{ padding: '10px', marginBottom: '10px' }}>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Sparkles size={12} /> Câu hỏi thường gặp:
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {['Cách đổi lịch?', 'Hủy lịch có mất cọc?', 'Giá có VAT chưa?', 'Quên mật khẩu?'].map(txt => (
                                        <button
                                            key={txt}
                                            onClick={() => handleSendMessage(txt)}
                                            className="suggestion-pill"
                                            style={{
                                                padding: '5px 12px',
                                                borderRadius: '15px',
                                                border: '1px solid #e2e8f0',
                                                fontSize: '0.75rem',
                                                background: '#fff',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {txt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`msg-row ${msg.role === 'bot' ? 'bot' : 'user'}`}>
                                <div className="msg-bubble">
                                    {msg.role === 'bot' ? (
                                        <div className="markdown-content">
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.text
                                    )}

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
                        <button onClick={() => handleSendMessage()} disabled={isTyping}><Send size={16} /></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeliChatbot;