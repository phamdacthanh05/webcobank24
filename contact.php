<?php
// 1. Kết nối tới database
require_once 'db.php'; 

// 2. Kiểm tra nếu form được gửi đi bằng phương thức POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Lấy dữ liệu từ form thông qua thuộc tính 'name'
    $fullname = $_POST['fullname'];
    $email    = $_POST['email'];
    $phone    = $_POST['phone'];
    $subject  = $_POST['subject'];
    $message  = $_POST['message'];

    // 3. Chuẩn bị câu lệnh SQL (Sử dụng Prepared Statements để bảo mật)
    $stmt = $conn->prepare("INSERT INTO contacts (fullname, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
    
    // Liên kết tham số (s = string)
    $stmt->bind_param("sssss", $fullname, $email, $phone, $subject, $message);

    // 4. Thực thi và phản hồi
    if ($stmt->execute()) {
        echo "<script>alert('Cảm ơn bạn! Thông tin đã được gửi thành công.'); window.location.href='contact.html';</script>";
    } else {
        echo "Lỗi khi lưu dữ liệu: " . $stmt->error;
    }

    // Đóng kết nối
    $stmt->close();
    $conn->close();
} else {
    header("Location: contact.html");
    exit();
}
?>