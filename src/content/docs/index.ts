import type { MDXContent } from "mdx/types";
import batDauNhanh from "./bat-dau-nhanh.mdx";
import board from "./board.mdx";
import caiDatApp from "./cai-dat-app.mdx";
import cheDoChay from "./che-do-chay.mdx";
import claudeCode from "./claude-code.mdx";
import collection from "./collection.mdx";
import duLieuVaCapNhat from "./du-lieu-va-cap-nhat.mdx";
import layPat from "./lay-pat.mdx";
import mapThuMuc from "./map-thu-muc.mdx";
import plugin from "./plugin.mdx";
import taoTicket from "./tao-ticket.mdx";
import telegram from "./telegram.mdx";
import terminal from "./terminal.mdx";
import tomTat from "./tom-tat.mdx";
import tongQuan from "./tong-quan.mdx";
import workItemDauTien from "./work-item-dau-tien.mdx";
import xuLySuCo from "./xu-ly-su-co.mdx";
import yeuCau from "./yeu-cau.mdx";

/** Static imports: a template import() of MDX breaks the dev prefetch validation for client components. */
export const DOC_CONTENT: Record<string, MDXContent> = {
  "bat-dau-nhanh": batDauNhanh,
  "board": board,
  "cai-dat-app": caiDatApp,
  "che-do-chay": cheDoChay,
  "claude-code": claudeCode,
  "collection": collection,
  "du-lieu-va-cap-nhat": duLieuVaCapNhat,
  "lay-pat": layPat,
  "map-thu-muc": mapThuMuc,
  "plugin": plugin,
  "tao-ticket": taoTicket,
  "telegram": telegram,
  "terminal": terminal,
  "tom-tat": tomTat,
  "tong-quan": tongQuan,
  "work-item-dau-tien": workItemDauTien,
  "xu-ly-su-co": xuLySuCo,
  "yeu-cau": yeuCau,
};
