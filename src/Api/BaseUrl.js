import axios from "axios";

// إعداد Axios مع قاعدة URL الأساسية
const baseUrl = axios.create({
    baseURL: "https://notaty-server.vercel.app/",
    headers: {
        "Content-Type": "application/json", // تأكد من إرسال البيانات كـ JSON
    },
});

// إضافة Authorization Header إذا كان التوكين موجودًا في localStorage
const token = localStorage.getItem("token");
if (token) {
    baseUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// التعامل مع الأخطاء باستخدام Interceptors
baseUrl.interceptors.response.use(
    (response) => response, // السماح بتمرير الاستجابة بشكل طبيعي إذا لم يكن هناك خطأ
    (error) => {
        console.error("API Error:", error); // طباعة الخطأ في وحدة التحكم للمساعدة في تتبعه
        return Promise.reject(error); // إعادة رفض الوعد لتمرير الخطأ إلى مكان الاستدعاء
    }
);

export default baseUrl;
