// lib/authBootstrap.js
import { getMe } from "@/services/auth.service";

/**
 * Bootstrap authentication
 *
 * ⚠️ QUAN TRỌNG:
 * - KHÔNG gọi refreshToken() thủ công
 * - Để interceptor tự động xử lý refresh
 * - Return user data hoặc null
 */
export const authBootstrap = async () => {
  try {
    // Chỉ gọi getMe()
    // Nếu token hết hạn → interceptor sẽ tự động:
    // 1. Refresh token
    // 2. Retry getMe()
    // 3. Return kết quả
    const response = await getMe();

    console.log("[authBootstrap] ✅ Authentication successful");
    return response; // Trả về user data
  } catch (error) {
    // Nếu đến đây nghĩa là:
    // - Interceptor đã thử refresh nhưng thất bại
    // - Hoặc không có refresh token
    // - Hoặc refresh token hết hạn

    console.log("[authBootstrap] ❌ Authentication failed:", {
      status: error.response?.status,
      code: error.response?.data?.code,
      message: error.response?.data?.message,
    });

    // Interceptor đã xử lý logout/redirect rồi
    // Chỉ return null để báo lỗi
    return null;
  }
};
