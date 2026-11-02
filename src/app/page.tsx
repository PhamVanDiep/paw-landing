import Link from "next/link";
import { DownloadButton } from "@/components/download-button";
import { Shot } from "@/components/shot";
import { TerminalDemo } from "@/components/terminal-demo";
import { formatDate, getLatestRelease, RELEASES_URL, type Download } from "@/lib/releases";

const STEPS = [
  { title: "Chọn work item", body: "Việc được giao cho bạn tự hiện trên board. Kéo thẻ sang Đang thực hiện hoặc bấm Bắt đầu chạy." },
  { title: "Claude làm trong thư mục của bạn", body: "Claude đọc yêu cầu, tạo nhánh feature và sửa code ngay trên bản làm việc đã clone. Bạn theo dõi trong terminal của app." },
  { title: "Bạn duyệt rồi kéo sang Đã xong", body: "Mọi thao tác cần quyền đều do bạn bấm đồng ý. Xong việc, PAW chuyển trạng thái trên Azure DevOps." },
];

const FEATURES = [
  { title: "Nhiều collection", body: "Gom việc từ các collection bạn theo dõi về một board, collection lỗi không làm ảnh hưởng collection khác." },
  { title: "Chạy song song", body: "Tối đa 8 việc cùng lúc, mỗi thư mục project chỉ một việc để không giẫm lên nhau." },
  { title: "Chạy theo lô", body: "Chọn nhiều thẻ của một project, Claude làm lần lượt trong một phiên, trên một nhánh." },
  { title: "Tạo Ticket", body: "Dán yêu cầu hoặc đính kèm file, Claude soạn work item để bạn xem lại trước khi gửi." },
  { title: "Tóm tắt tuần và tháng", body: "Báo cáo tự tạo theo lịch, viết đúng bố cục mẫu của bạn. Máy tắt thì chạy bù khi mở lại." },
  { title: "Thông báo", body: "Biết ngay khi Claude cần bạn, qua popup của hệ điều hành hoặc Telegram." },
];

const FAQ = [
  { q: "PAW có tự commit hay push code không?", a: "Claude chỉ thực hiện khi bạn đồng ý trong terminal. PAW không dùng cờ bỏ qua quyền, và không có nút duyệt riêng: mọi xin phép đều hiện đúng trong phiên Claude." },
  { q: "Việc đang làm dở trong thư mục có bị mất không?", a: "Trước khi chạy, PAW kiểm tra thư mục và hiện danh sách file chưa commit. Bạn phải chọn Vẫn chạy thì việc mới bắt đầu. Claude cũng được dặn không xóa, stash hay ghi đè thay đổi của bạn." },
  { q: "Chi phí Claude tính thế nào?", a: "PAW dùng chính tài khoản Claude Code đã đăng nhập trên máy bạn, nên mức dùng tính vào tài khoản đó. PAW không có gói trả phí riêng." },
  { q: "Vì sao Windows cảnh báo khi cài?", a: "Bộ cài chưa được ký số nên SmartScreen hiện cảnh báo. Bấm More info rồi Run anyway. Trang Cài đặt app có hướng dẫn cho từng hệ điều hành." },
  { q: "Đóng cửa sổ thì Claude có dừng không?", a: "Không. Đóng cửa sổ chỉ ẩn PAW xuống khay hệ thống. Khi thoát hẳn, PAW hỏi trước nếu còn phiên Claude đang chạy." },
  { q: "App có tự cập nhật không?", a: "Có. PAW tự tải bản mới chạy ngầm, hỏi một lần có khởi động lại không, và không bao giờ tự khởi động lại." },
];

function DownloadLink({ d, label }: { d: Download; label: string }) {
  return (
    <a href={d.url} className="btn btn-ghost justify-between !px-3 whitespace-nowrap text-[0.95rem]">
      <span>{label}</span>
      {d.available ? (
        <span className="text-sm font-normal text-muted">{d.sizeMb} MB</span>
      ) : (
        <span className="rounded-full bg-tint px-2 py-0.5 text-xs font-semibold text-amber-text">Sắp có</span>
      )}
    </a>
  );
}

export default async function Home() {
  const { version, publishedAt, downloads } = await getLatestRelease();
  const versionLine = version && publishedAt ? `Phiên bản ${version}, phát hành ${formatDate(publishedAt)}` : null;

  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-12 pt-12 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:pb-20 lg:pt-20">
          <div>
            <h1 className="text-[clamp(2.3rem,5vw,3.6rem)] font-extrabold leading-[1.12] tracking-tight text-balance">
              Từ work item đến code đã push, ngay trên máy bạn.
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg text-muted">
              PMIS Auto Work đưa việc Azure DevOps của bạn lên bảng Kanban và chạy Claude Code cho từng thẻ, trong đúng thư mục project. Bạn duyệt từng bước.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <DownloadButton windowsUrl={downloads.windows.url} />
              <Link href="/docs/bat-dau-nhanh" className="btn btn-ghost">Hướng dẫn cài đặt</Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              {versionLine ? `${versionLine}. ` : ""}Bộ cài chưa ký số, hệ điều hành sẽ cảnh báo lần đầu.{" "}
              <Link href="/docs/cai-dat-app" className="underline underline-offset-2">Cách mở</Link>
            </p>
          </div>
          <Shot name="board" alt="Board của PAW với năm cột, từ Mới được gán đến Đã xong" priority className="lg:-mr-40 lg:w-[calc(100%+10rem)]" />
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-bold tracking-tight">Cách hoạt động</h2>
          <div className="relative mt-10">
            {/* Height matches the step offsets below: the line passes through each number and above each text. */}
            <svg viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden className="rise-path absolute inset-x-0 top-0 h-60 w-full max-lg:hidden">
              <path
                d="M0 200 C 120 190, 250 165, 363 116 S 590 60, 708 36 S 900 12, 1000 6"
                fill="none"
                stroke="var(--amber)"
                strokeWidth="5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <ol className="relative grid gap-8 lg:grid-cols-3 lg:gap-10">
              {STEPS.map((s, i) => (
                <li key={s.title} className={i === 0 ? "lg:mt-44" : i === 1 ? "lg:mt-24" : "lg:mt-4"}>
                  <span className="grid size-10 place-items-center rounded-full bg-amber font-bold text-[#10244f]">{i + 1}</span>
                  <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Một phiên Claude thật, ngay trong app</h2>
            <p className="mt-3 max-w-[52ch] text-muted">
              Mỗi việc là một phiên <code className="font-mono text-[0.92em]">claude</code> tương tác như khi bạn gõ trong terminal. Bạn trả lời câu hỏi, dán ảnh lỗi, kéo file vào, hoặc nhảy vào giữa chừng để chỉnh hướng.
            </p>
          </div>
          <TerminalDemo />
        </div>
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Shot name="runs" alt="Trang Tiến trình liệt kê các phiên Claude đang chạy, chờ bạn và trong hàng đợi" className="max-lg:order-2" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Biết ngay việc nào đang chờ bạn</h2>
            <p className="mt-3 max-w-[46ch] text-muted">
              Trang Tiến trình gom mọi phiên: đang chạy, chờ bạn, trong hàng đợi và bị gián đoạn. Phiên bị ngắt thì bấm Tiếp tục, Claude quay lại đúng phiên cũ.
            </p>
          </div>
        </div>
        <dl className="mt-16 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <dt className="font-bold">{f.title}</dt>
              <dd className="mt-1 text-muted">{f.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-[#14306f] text-white dark:bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Quyền quyết định vẫn ở bạn</h2>
            <p className="mt-3 max-w-[46ch] text-[#c9d7f2]">PAW không chạy trên máy chủ nào của riêng nó. Mọi thứ nằm trên máy bạn.</p>
          </div>
          <ul className="space-y-4 text-[#dfe8f8]">
            <li><strong className="text-white">Bạn duyệt từng thao tác.</strong> Sửa file, chạy lệnh, git push đều theo quyền Claude Code hỏi trong terminal.</li>
            <li><strong className="text-white">Không lưu token Claude.</strong> PAW dùng lệnh claude đã đăng nhập sẵn trên máy.</li>
            <li><strong className="text-white">PAT được mã hóa.</strong> PAT Azure DevOps và token Telegram được lưu mã hóa AES-256 trên máy.</li>
            <li><strong className="text-white">Việc chỉ xong khi Azure DevOps nói xong.</strong> Trạng thái Hoàn tất lấy từ work item đã đóng thật.</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-20">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Yêu cầu</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            <li>Windows, macOS hoặc Ubuntu</li>
            <li>Claude Code đã cài và đã đăng nhập</li>
            <li>git và quyền truy cập repo của project</li>
            <li>PAT Azure DevOps có quyền Work Items</li>
          </ul>
          <Link href="/docs/yeu-cau" className="mt-4 inline-block font-medium text-blue underline underline-offset-3">Xem đủ yêu cầu</Link>
        </div>
        <div id="tai-ve" className="scroll-mt-24">
          <h2 className="text-3xl font-bold tracking-tight">Tải về</h2>
          {versionLine && <p className="mt-2 text-muted">{versionLine}</p>}
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div className="grid content-start gap-2">
              <h3 className="font-bold">Windows</h3>
              <DownloadLink d={downloads.windows} label="Bộ cài .exe" />
            </div>
            <div className="grid content-start gap-2">
              <h3 className="font-bold">macOS</h3>
              <DownloadLink d={downloads.macArm} label="Apple Silicon" />
              <DownloadLink d={downloads.macIntel} label="Intel" />
            </div>
            <div className="grid content-start gap-2">
              <h3 className="font-bold">Ubuntu</h3>
              <DownloadLink d={downloads.deb} label=".deb" />
              <DownloadLink d={downloads.appImage} label="AppImage" />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">
            Bản Sắp có dẫn tới trang phát hành. <a href={RELEASES_URL} className="underline underline-offset-2">Các bản trước</a>
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-bold tracking-tight">Câu hỏi thường gặp</h2>
          <div className="mt-6">
            {FAQ.map((f) => (
              <details key={f.q} className="border-b border-line py-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
