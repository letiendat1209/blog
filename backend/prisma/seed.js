import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/lib/generated/prisma/client.ts";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const creatorId = "ecafd1fe-3fe7-4c56-a040-e7dd7abd87cb";

const post = [
  {
    slug: "gioi-thieu-ve-typescript",
    authorId: creatorId,
    title: "Giới Thiệu Sơ Lược Về TypeScript",
    coverImage: "/images/covers/typescript.jpg",
    shortDescription:
      "Tìm hiểu các tính năng cốt lõi và lợi ích của việc sử dụng TypeScript trong dự án JavaScript của bạn.",
    content:
      "TypeScript là một ngôn ngữ lập trình mã nguồn mở, được phát triển bởi Microsoft. Nó là một siêu tập hợp cú pháp (superset) của JavaScript và biên dịch về JavaScript thuần túy. Nó bổ sung thêm tính năng gõ tĩnh tùy chọn...",
    tags: "typescript, javascript, lap-trinh",
    labels: "front-end, cong-nghe",
    category: "LapTrinh",
    publishedAt: new Date("2025-11-20T10:00:00Z"),
    readTime: 7,
    views: 1250,
    likes: 85,
    status: "PUBLISHED",
    isFeatured: true,
    relatedPosts: "hoc-typescript-nhu-the-nao",
    // createdAt và updatedAt sẽ được Prisma quản lý
  },
  {
    slug: "10-meo-su-dung-react-hooks",
    authorId: creatorId,
    title: "10 Mẹo Tăng Tốc Với React Hooks",
    coverImage: "/images/covers/react-hooks.png",
    shortDescription:
      "Khám phá các thủ thuật hiệu quả để tối ưu hóa việc sử dụng useState, useEffect và các Hooks tùy chỉnh.",
    content:
      "React Hooks đã thay đổi cách chúng ta viết các component trong React. Việc sử dụng chúng một cách thông minh có thể giúp code của bạn sạch sẽ và dễ bảo trì hơn...",
    tags: "react, hooks, frontend, webdev",
    labels: "react-js, javascript",
    category: "FrontEnd",
    publishedAt: new Date("2025-11-15T14:30:00Z"),
    readTime: 5,
    views: 3400,
    likes: 210,
    status: "PUBLISHED",
    isFeatured: true,
    relatedPosts: "gioi-thieu-react-context",
  },
  {
    slug: "lap-trinh-bat-dong-bo-voi-async-await",
    authorId: creatorId,
    title: "Lập Trình Bất Đồng Bộ Trong JavaScript: Async/Await",
    coverImage: "/images/covers/async-await.jpeg",
    shortDescription:
      "Hướng dẫn chi tiết về cách sử dụng cú pháp async/await để quản lý các tác vụ bất đồng bộ một cách dễ dàng.",
    content:
      "Trước khi có async/await, chúng ta thường phải đối mặt với 'callback hell' hoặc sử dụng `.then()` phức tạp. Async/await giúp mã bất đồng bộ trông giống như mã đồng bộ...",
    tags: "javascript, async-await, lap-trinh-bat-dong-bo",
    labels: "cong-nghe, nang-cao",
    category: "LapTrinh",
    publishedAt: new Date("2025-11-10T09:15:00Z"),
    readTime: 8,
    views: 980,
    likes: 55,
    status: "PUBLISHED",
    isFeatured: false,
    relatedPosts: "promise-trong-javascript",
  },
  {
    slug: "huong-dan-cai-dat-linux-server",
    authorId: creatorId,
    title: "Hướng Dẫn Cài Đặt và Cấu Hình Linux Server Cơ Bản",
    coverImage: "/images/covers/linux-server.jpg",
    shortDescription:
      "Các bước cần thiết để thiết lập một máy chủ Linux (Ubuntu) từ đầu.",
    content:
      "Linux là hệ điều hành phổ biến nhất cho các máy chủ web. Hướng dẫn này sẽ chỉ cho bạn cách cài đặt, cập nhật và cấu hình bảo mật cơ bản...",
    tags: "linux, server, sysadmin",
    labels: "devops, he-thong",
    category: "HeThong",
    publishedAt: new Date("2025-10-28T16:00:00Z"),
    readTime: 12,
    views: 520,
    likes: 30,
    status: "PUBLISHED",
    isFeatured: false,
    relatedPosts: "cau-hinh-ssh-server",
  },
  {
    slug: "nguyen-ly-thiet-ke-oop",
    authorId: creatorId,
    title: "Bốn Nguyên Lý Thiết Kế Hướng Đối Tượng (OOP) Cốt Lõi",
    coverImage: "/images/covers/oop.png",
    shortDescription:
      "Tóm tắt về Đóng gói, Kế thừa, Đa hình và Trừu tượng trong lập trình OOP.",
    content:
      "Lập trình hướng đối tượng là một mô hình lập trình dựa trên khái niệm 'đối tượng', có thể chứa dữ liệu dưới dạng các trường và mã dưới dạng các thủ tục...",
    tags: "oop, thiet-ke-phan-mem, lap-trinh",
    labels: "kien-truc, co-ban",
    category: "LapTrinh",
    publishedAt: new Date("2025-10-20T11:45:00Z"),
    readTime: 6,
    views: 2100,
    likes: 150,
    status: "PUBLISHED",
    isFeatured: true,
    relatedPosts: "solid-principles-la-gi",
  },
  {
    slug: "kien-truc-microservices-va-monolith",
    authorId: creatorId,
    title: "Microservices so với Monolith: Khi nào nên chọn cái nào?",
    coverImage: "/images/covers/microservices.jpg",
    shortDescription:
      "So sánh chi tiết hai mô hình kiến trúc phần mềm phổ biến nhất.",
    content:
      "Việc lựa chọn kiến trúc phù hợp là quyết định then chốt cho sự thành công lâu dài của một dự án phần mềm...",
    tags: "microservices, monolith, kien-truc-phan-mem",
    labels: "backend, devops",
    category: "KienTruc",
    publishedAt: new Date("2025-10-05T08:30:00Z"),
    readTime: 10,
    views: 1800,
    likes: 95,
    status: "PUBLISHED",
    isFeatured: false,
    relatedPosts: "api-gateway-la-gi",
  },
  {
    slug: "lam-viec-voi-prisma-orm-co-ban",
    authorId: creatorId,
    title: "Các Thao Tác Cơ Bản Với Prisma ORM",
    coverImage: "/images/covers/prisma-orm.png",
    shortDescription:
      "Hướng dẫn thiết lập và sử dụng các câu lệnh CRUD cơ bản với Prisma.",
    content:
      "Prisma là một ORM hiện đại, mã nguồn mở, giúp việc truy cập cơ sở dữ liệu trở nên dễ dàng và an toàn hơn...",
    tags: "prisma, orm, database, nodejs",
    labels: "backend, cong-nghe",
    category: "Database",
    publishedAt: new Date("2025-09-25T13:00:00Z"),
    readTime: 9,
    views: 750,
    likes: 40,
    status: "PUBLISHED",
    isFeatured: false,
    relatedPosts: "prisma-migration-huong-dan",
  },
  {
    slug: "toi-uu-hoa-hieu-nang-website",
    authorId: creatorId,
    title: "Các Kỹ Thuật Tối Ưu Hóa Hiệu Năng Website",
    coverImage: "/images/covers/performance.jpeg",
    shortDescription:
      "Tăng tốc độ tải trang và cải thiện điểm số Google PageSpeed của bạn.",
    content:
      "Hiệu năng website không chỉ ảnh hưởng đến trải nghiệm người dùng mà còn là một yếu tố xếp hạng quan trọng của Google...",
    tags: "web-performance, seo, frontend",
    labels: "toi-uu-hoa, webdev",
    category: "WebDev",
    publishedAt: new Date("2025-09-10T15:30:00Z"),
    readTime: 7,
    views: 4500,
    likes: 320,
    status: "PUBLISHED",
    isFeatured: true,
    relatedPosts: "toi-uu-anh-cho-web",
  },
  {
    slug: "gioi-thieu-ve-devops-co-ban",
    authorId: creatorId,
    title: "DevOps là gì? Hướng dẫn cho người mới bắt đầu",
    coverImage: "/images/covers/devops.png",
    shortDescription: "Khái niệm, công cụ và quy trình cơ bản của DevOps.",
    content:
      "DevOps là sự kết hợp của phát triển phần mềm (Development) và vận hành hệ thống (Operations). Nó nhằm mục đích rút ngắn chu kỳ phát triển hệ thống...",
    tags: "devops, cicd, he-thong",
    labels: "co-ban, devops-tools",
    category: "DevOps",
    publishedAt: new Date("2025-08-01T10:00:00Z"),
    readTime: 11,
    views: 600,
    likes: 35,
    status: "PUBLISHED",
    isFeatured: false,
    relatedPosts: "docker-co-ban",
  },
  {
    slug: "cach-viet-unit-test-hieu-qua",
    authorId: creatorId,
    title: "Cách Viết Unit Test Hiệu Quả và Dễ Bảo Trì",
    coverImage: "/images/covers/unit-test.jpg",
    shortDescription:
      "Các nguyên tắc cơ bản và mẹo để tạo ra các unit test đáng tin cậy.",
    content:
      "Unit test là một phần quan trọng của quy trình phát triển phần mềm hiện đại. Nó giúp đảm bảo từng 'đơn vị' mã hoạt động chính xác...",
    tags: "testing, unit-test, lap-trinh",
    labels: "chat-luong-code",
    category: "Testing",
    publishedAt: null, // Chưa xuất bản
    readTime: 8,
    views: 0,
    likes: 0,
    status: "DRAFT", // Trạng thái nháp
    isFeatured: false,
    relatedPosts: null,
  },
];

const main = async () => {
  console.log(`Start seeding ...`);

  for (const p of post) {
    const post = await prisma.post.create({
      data: p,
    });
    console.log(`Created post with id: ${post.title}`);
  }

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
