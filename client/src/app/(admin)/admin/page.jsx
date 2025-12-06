export default function Page() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl">
          <h3>Tổng quan</h3>
          <span>Tổng số bài viết đã đăng.</span>
          <span> Số lượng người dùng đăng ký (nếu có).</span>
          <span>Thống kê lượt xem/truy cập gần đây.</span>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl"></div>
        <div className="bg-muted/50 aspect-video rounded-xl"></div>
      </div>

      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
    </>
  );
}
