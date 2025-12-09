export const blogs = [
  // BÀI GỐC (Đã Xuất Bản)
  {
    id: "1",
    slug: "chao-mung-moi-nguoi-den-voi-trang-web",
    author: "Lê Tiến Đạt",
    authorImage:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/163050864_3003938323264883_2617536581490542695_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5eD_gf3iDCcQ7kNvwFQTcT5&_nc_oc=Adl7JGmqoVbN3YPcK1OnuOGye0ts_pihAGq_7r84eiPdvCDyL8oH5Pz3zByayr_X_dQuxK2Czokc-p-Cbt1QJdqL&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=r4yrtrJLc4LJ7ttQp5eZfg&oh=00_AfmtM-kwQpKioUgwVw97m9HhZOBx4o-zImNeY0cH-2J1nQ&oe=6937F210",
    authorLink: "/about",
    name: "Chào mừng mọi người đến với trang web",
    coverImage:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription: "Chào mừng mọi người đến với trang web",
    excerpt: "Trang web này sẽ là nơi tôi chia sẻ kiến thức...",
    content: "Markdown or HTML content goes here...",
    tags: ["welcome", "intro"],
    label: "linh tinh",
    category: "General",
    date: "12-05-2025",
    updatedAt: "12-05-2025",
    readTime: "1 mins read",
    views: 1200,
    likes: 55,
    status: "published", // ĐÃ SỬ DỤNG STATUS TỐI GIẢN
    isFeatured: true,
    relatedPosts: ["2", "3"],
  },

  // --- BÀI BLOG 2: Đã Xuất Bản ---
  {
    id: "2",
    slug: "huong-dan-toi-uu-hoa-seo-cho-nguoi-moi",
    author: "Nguyễn Thị A",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    authorLink: "/authors/nguyen-thi-a",
    name: "Hướng dẫn tối ưu hóa SEO cơ bản cho người mới bắt đầu",
    coverImage:
      "https://images.unsplash.com/photo-1557835334-9273f5505417?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription: "Các bước cơ bản để làm SEO on-page hiệu quả.",
    excerpt:
      "Bài viết này sẽ đưa ra các mẹo và thủ thuật SEO on-page quan trọng...",
    content: "Content about SEO basics...",
    tags: ["seo", "marketing", "tips"],
    label: "hữu ích",
    category: "Marketing",
    date: "12-08-2025",
    updatedAt: "12-09-2025",
    readTime: "7 mins read",
    views: 4500,
    likes: 180,
    status: "published",
    isFeatured: true,
    relatedPosts: ["1", "3"],
  },

  // --- BÀI BLOG 3: Đang Viết (Draft) ---
  {
    id: "3",
    slug: "5-thu-vien-javascript-phai-biet-trong-nam-2026",
    author: "Phạm Văn B",
    authorImage: "https://randomuser.me/api/portraits/men/78.jpg",
    authorLink: "/authors/pham-van-b",
    name: "5 Thư viện JavaScript không thể bỏ qua trong năm 2026",
    coverImage:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription: "Tổng hợp các framework và thư viện JS mới nhất.",
    excerpt: "Một cái nhìn sâu sắc vào những công cụ mạnh mẽ sẽ định hình...",
    content: "Content about JavaScript libraries...",
    tags: ["javascript", "frontend", "programming"],
    label: "công nghệ",
    category: "Technology",
    date: "12-15-2025", // Ngày dự kiến
    updatedAt: "12-09-2025",
    readTime: "10 mins read",
    views: 0,
    likes: 0,
    status: "draft",
    isFeatured: false,
    relatedPosts: ["4", "5"],
  },

  // --- BÀI BLOG 4: Đã Lên Lịch ---
  {
    id: "4",
    slug: "cong-thuc-pha-che-caphe-tai-nha",
    author: "Đỗ Thị C",
    authorImage: "https://randomuser.me/api/portraits/women/55.jpg",
    authorLink: "/authors/do-thi-c",
    name: "Công thức pha chế cà phê chuẩn 'barista' ngay tại nhà",
    coverImage:
      "https://images.unsplash.com/photo-1541167760496-12188219323c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription:
      "Bí quyết để có ly cà phê ngon mà không cần máy móc phức tạp.",
    excerpt: "Từ espresso cơ bản đến latte art, mọi thứ đều có thể...",
    content: "Content about coffee recipes...",
    tags: ["lifestyle", "coffee", "recipes"],
    label: "thú vị",
    category: "Lifestyle",
    date: "01-01-2026", // Ngày sẽ xuất bản
    updatedAt: "12-09-2025",
    readTime: "5 mins read",
    views: 0,
    likes: 0,
    status: "scheduled",
    isFeatured: false,
    relatedPosts: ["1"],
  },

  // --- BÀI BLOG 5: Lưu Trữ (Cần Cập Nhật) ---
  {
    id: "5",
    slug: "danh-gia-dien-thoai-xx-nam-2024",
    author: "Lê Tiến Đạt",
    authorImage:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/163050864_3003938323264883_2617536581490542695_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5eD_gf3iDCcQ7kNvwFQTcT5&_nc_oc=Adl7JGmqoVbN3YPcK1OnuOGye0ts_pihAGq_7r84eiPdvCDyL8oH5Pz3zByayr_X_dQuxK2Czokc-p-Cbt1QJdqL&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=r4yrtrJLc4LJ7ttQp5eZfg&oh=00_AfmtM-kwQpKioUgwVw97m9HhZOBx4o-zImNeY0cH-2J1nQ&oe=6937F210",
    authorLink: "/about",
    name: "Đánh giá chi tiết điện thoại Phone XX (Phiên bản năm ngoái)",
    coverImage:
      "https://images.unsplash.com/photo-1546738548-ad9d660e515d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription: "Đánh giá lại một sản phẩm công nghệ đã cũ.",
    excerpt:
      "Bài viết này cần được cập nhật thông tin về các bản vá lỗi và giá mới.",
    content: "Content about Phone XX review...",
    tags: ["review", "technology", "mobile"],
    label: "cần làm mới",
    category: "Technology",
    date: "05-10-2024",
    updatedAt: "12-09-2025",
    readTime: "8 mins read",
    views: 8900,
    likes: 310,
    status: "archived", // Chuyển sang Lưu Trữ để bảo trì
    isFeatured: false,
    relatedPosts: ["2", "6"],
  },

  // --- BÀI BLOG 6: Ý Tưởng Mới (Draft) ---
  {
    id: "6",
    slug: "gioi-thieu-ve-webassembly-va-tuong-lai-cua-web",
    author: "Lê Tiến Đạt",
    authorImage:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/163050864_3003938323264883_2617536581490542695_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5eD_gf3iDCcQ7kNvwFQTcT5&_nc_oc=Adl7JGmqoVbNn3YPcK1OnuOGye0ts_pihAGq_7r84eiPdvCDyL8oH5Pz3zByayr_X_dQuxK2Czokc-p-Cbt1QJdqL&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=r4yrtrJLc4LJ7ttQp5eZfg&oh=00_AfmtM-kwQpKioUgwVw97m9HhZOBx4o-zImNeY0cH-2J1nQ&oe=6937F210",
    authorLink: "/about",
    name: "WebAssembly: Định hình lại tương lai của web",
    coverImage:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9491?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription: "Phân tích về WebAssembly và tiềm năng của nó.",
    excerpt: "WebAssembly (Wasm) đang mang đến hiệu năng gần như native...",
    content: "Content about WebAssembly...",
    tags: ["webassembly", "technology", "future"],
    label: "nghiên cứu",
    category: "Technology",
    date: null,
    updatedAt: "12-09-2025",
    readTime: "9 mins read",
    views: 0,
    likes: 0,
    status: "draft", // Ý tưởng mới cũng coi là bản nháp
    isFeatured: false,
    relatedPosts: ["3"],
  },
];
