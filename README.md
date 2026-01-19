# DevBlog CMS 🚀

Một **Blog CMS dành cho developer**, nơi viết – đọc – tranh luận kỹ thuật một cách văn minh nhưng không hề nhàm chán. Dự án này được xây như một playground nghiêm túc để mình rèn **Frontend + Backend + System thinking**.

## ✨ Mục tiêu dự án

* Xây một blog *chuẩn dev dùng*, không màu mè nhưng UX phải đã
* Tập trung vào kiến trúc, data flow, performance và DX (Developer Experience)
* Dùng công nghệ hiện đại, code rõ ràng, có thể scale

## 🧠 Tính năng chính

* ✍️ CRUD bài viết (Markdown support)
* 💬 Hệ thống bình luận nhiều tầng (nested comments)
* ❤️ Reaction (like, emoji, vote…)
* 👤 Auth (User / Guest)
* 🔍 Pagination + caching
* 🧼 Soft delete ("[Bình luận đã bị xoá]" nhưng không phá luồng hội thoại)

## 🖥️ Tech Stack

### Frontend

* **Next.js** (App Router)
* **JavaScript**
* **Tailwind CSS** + **shadcn/ui**
* Client / Server Components tách bạch
* UX ưu tiên đọc lâu, không mỏi mắt

### Backend

* **Node.js** + **Express**
* **Prisma ORM**
* **PostgreSQL**
* **Redis** (cache + optimization)

### Khác

* RESTful API
* Clean architecture ở mức vừa đủ, không overkill

## 🗂️ Kiến trúc tổng quan (high-level)

* Frontend gọi API qua layer service
* Backend chia rõ: routes → controllers → services → database
* Comment & reaction được thiết kế để không query nặng khi scale

## ⚙️ Cài đặt & chạy local

```bash
# clone repo
git clone https://github.com/letiendat1209/blog.git

# frontend
cd frontend
npm install
npm run dev

# backend
cd backend
npm install
npm run dev
```

Tạo file `.env` cho backend:

```env
DATABASE_URL=postgresql://...
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret
lười quá , ae muốn clone ib tui 
```

## 📌 Những gì mình học được

* Thiết kế data cho comment nhiều tầng không đơn giản như tưởng
* UX nhỏ (reply, mention, soft delete) ảnh hưởng cực lớn đến trải nghiệm
* Redis cứu performance nhưng cũng dễ toang nếu config sai 😅

## 🛠️ Hướng phát triển tiếp theo

* Search full-text
* Notification khi có reply
* Role & permission
* Tối ưu SEO cho bài viết

## 👋 About author

**Lê Tiến Đạt**
Frontend Developer (đang train lên Fullstack)
Dự án này được build để bỏ vào CV **và** để chứng minh là: *mình không chỉ biết code giao diện.*

---

Nếu bạn là recruiter hay dev ngang qua repo này:
👉 Cứ đọc code, mình để tâm vào nó hơn là mấy dòng marketing 😄
