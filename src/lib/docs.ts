export type DocPage = { slug: string; title: string; description: string };
export type DocGroup = { title: string; pages: DocPage[] };

export const DOC_GROUPS: DocGroup[] = [
  {
    title: "Bắt đầu",
    pages: [
      { slug: "tong-quan", title: "Tổng quan", description: "PAW là gì và làm việc như thế nào." },
      { slug: "bat-dau-nhanh", title: "Bắt đầu nhanh", description: "Năm bước từ lúc tải app đến lúc chạy được việc đầu tiên." },
      { slug: "yeu-cau", title: "Yêu cầu", description: "Những thứ cần có trước khi cài." },
      { slug: "cai-dat-app", title: "Cài đặt app", description: "Cài PAW trên Windows, macOS và Ubuntu." },
    ],
  },
  {
    title: "Kết nối",
    pages: [
      { slug: "claude-code", title: "Claude Code", description: "Cài Claude Code, đăng nhập và kiểm tra trong app." },
      { slug: "plugin", title: "Plugin pmis3-skills", description: "Tuỳ chọn: luật và skill theo quy trình PMIS3." },
      { slug: "lay-pat", title: "Lấy PAT Azure DevOps", description: "Tạo Personal Access Token đúng quyền." },
      { slug: "map-thu-muc", title: "Map project với thư mục", description: "Cho PAW biết mỗi project nằm ở đâu trên máy." },
      { slug: "luat-trang-thai", title: "Luật trạng thái", description: "Việc nào được bắt đầu và khi nào coi là xong." },
      { slug: "collection", title: "Collection", description: "Theo dõi việc ở nhiều collection." },
      { slug: "telegram", title: "Telegram", description: "Nhận thông báo và bản tóm tắt qua Telegram." },
    ],
  },
  {
    title: "Sử dụng",
    pages: [
      { slug: "work-item-dau-tien", title: "Chạy work item đầu tiên", description: "Một vòng làm việc đầy đủ, từ thẻ đến Đã xong." },
      { slug: "board", title: "Board", description: "Các cột, bộ lọc và thao tác hàng loạt." },
      { slug: "terminal", title: "Terminal và phím tắt", description: "Sao chép, dán, gửi ảnh và file cho Claude." },
      { slug: "che-do-chay", title: "Chế độ chạy", description: "Lần lượt, song song và chạy theo lô." },
      { slug: "mau-prompt", title: "Mẫu prompt", description: "Sửa nội dung PAW gửi cho agent khi bắt đầu việc." },
      { slug: "tao-ticket", title: "Tạo Ticket", description: "Nhờ Claude soạn work item rồi gửi lên Azure DevOps." },
      { slug: "tom-tat", title: "Tóm tắt và báo cáo", description: "Báo cáo tuần, tháng và mẫu báo cáo của riêng bạn." },
    ],
  },
  {
    title: "Tham khảo",
    pages: [
      { slug: "du-lieu-va-cap-nhat", title: "Dữ liệu và cập nhật", description: "PAW lưu gì, lưu ở đâu và tự cập nhật ra sao." },
      { slug: "xu-ly-su-co", title: "Xử lý sự cố", description: "Các lỗi hay gặp và cách xử lý." },
    ],
  },
];

export const DOC_PAGES: DocPage[] = DOC_GROUPS.flatMap((g) => g.pages);

/** Heading anchors: Vietnamese text to plain ascii, the same on the h2 and in the page outline. */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
