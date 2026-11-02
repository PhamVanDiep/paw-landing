# PAW landing

Trang giới thiệu và tài liệu của PMIS Auto Work. Next.js, nội dung MDX trong `src/content/docs`, triển khai trên Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

- Thêm trang tài liệu: tạo `src/content/docs/<slug>.mdx` rồi khai báo trong `src/lib/docs.ts`.
- Link tải lấy từ GitHub Releases của `PhamVanDiep/pmis-auto-work-releases`, cache 1 giờ (`src/lib/releases.ts`). Bản mới lên release là nút tải tự đổi, không cần deploy lại.
- Ảnh trong `public/shots` chụp từ bộ e2e của PAW với dữ liệu mẫu, không có dữ liệu thật.
