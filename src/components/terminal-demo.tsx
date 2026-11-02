/** A drawing of a Claude Code session, not a capture: real sessions hold real code. */
export function TerminalDemo() {
  return (
    <figure className="min-w-0">
      <div className="overflow-x-auto rounded-xl bg-[#0f1d3d] p-5 font-mono text-[0.85rem] leading-7 text-[#e4ecfa]">
        <p className="whitespace-pre text-[#9fb2d6]">{"> Làm work item #131495 theo mô tả trên Azure DevOps"}</p>
        <p className="mt-3 whitespace-pre"><span className="text-[#f0a454]">●</span>{" Đã sửa định dạng ngày và chạy test: 42 passed."}</p>
        <p className="whitespace-pre"><span className="text-[#f0a454]">●</span>{" Tiếp theo mình push nhánh để bạn tạo pull request."}</p>
        <div className="mt-3 w-fit rounded-lg border border-[#3a5183] px-4 py-3">
          <p className="whitespace-pre font-semibold">Bash command</p>
          <p className="whitespace-pre text-[#9fb2d6]">{"git push -u origin feature/131495-sai-dinh-dang-ngay"}</p>
          <p className="mt-2 whitespace-pre">Do you want to proceed?</p>
          <p className="whitespace-pre text-[#f0a454]">{"❯ 1. Yes"}</p>
          <p className="whitespace-pre">{"  2. No"}</p>
        </div>
      </div>
      <figcaption className="mt-2 text-sm text-muted">Hình minh họa một phiên Claude Code.</figcaption>
    </figure>
  );
}
