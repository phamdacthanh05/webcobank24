/**
 * Hàm chuyển hướng người dùng từ trang hoạt động sang trang liên hệ
 * kèm theo thông tin chủ đề và lời nhắn mẫu qua URL parameters.
 */
function redirectToContact(subject, message) {
    // Mã hóa ký tự (encodeURIComponent) để tránh lỗi font tiếng Việt trên thanh địa chỉ URL
    const url = `contact.html?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`;
    window.location.href = url;
}

// Chờ cho trang HTML tải xong cấu trúc DOM thì mới thực thi code bên trong
document.addEventListener('DOMContentLoaded', () => {
    
    // === XỬ LÝ CHO TRANG ACT.HTML (Form tư vấn nhanh ở cuối trang) ===
    const consultBtn = document.getElementById('consultBtn');
    if (consultBtn) {
        consultBtn.addEventListener('click', function() {
            const emailInput = document.getElementById('contactEmail');
            const phoneInput = document.getElementById('contactPhone');
            const feedback = document.getElementById('formFeedback');

            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';

            if (!email) {
                if (feedback) {
                    feedback.style.color = "red";
                    feedback.innerText = "Vui lòng nhập Email của bạn!";
                }
                return;
            }

            // Tự động chuyển trang kèm lời nhắn gom cả Email và Số điện thoại vừa nhập
            const customMessage = `Tôi muốn nhận tư vấn combo hoạt động. Email: ${email}${phone ? ' - SĐT: ' + phone : ''}`;
            redirectToContact('Hoạt động cắm trại, câu cá', customMessage);
        });
    }

    // === XỬ LÝ CHO TRANG CONTACT.HTML (Tự động điền thông tin từ URL) ===
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    const messageParam = urlParams.get('message');

    if (subjectParam || messageParam) {
        const selectSubject = document.querySelector('select[name="subject"]');
        const textareaMessage = document.querySelector('textarea[name="message"]');

        // 1. Tự động chọn Option phù hợp trong dropdown Chủ đề
        if (subjectParam && selectSubject) {
            let isMatched = false;
            for (let option of selectSubject.options) {
                if (option.value === subjectParam) {
                    option.selected = true;
                    isMatched = true;
                    break;
                }
            }
            // Nếu chủ đề truyền từ act.html sang chưa có sẵn trong danh sách option, tự tạo mới nó
            if (!isMatched) {
                const newOption = new Option(subjectParam, subjectParam, true, true);
                selectSubject.appendChild(newOption);
            }
        }

        // 2. Tự động điền nội dung vào ô Lời nhắn
        if (messageParam && textareaMessage) {
            textareaMessage.value = messageParam;
        }
    }
});
