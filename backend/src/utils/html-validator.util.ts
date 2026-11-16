/**
 * Tiện ích kiểm định tính toàn vẹn của mã nguồn HTML sinh ra từ AI.
 * Đảm bảo đáp ứng đầy đủ cấu trúc của một tài liệu web có thể hiển thị được
 * và loại bỏ các trường hợp AI bị crash hoặc trả về thông báo lỗi dạng XML/JSON.
 */
export function isValidDeliverableHtml(html: string | undefined | null): boolean {
  if (!html || typeof html !== 'string') return false;
  const trimmed = html.trim();
  if (trimmed.length === 0) return false;

  // 1. Tuyệt đối không được chứa thông báo lỗi hệ thống từ AI API
  const isErrorPayload = trimmed.includes('<Error>') && trimmed.includes('<Code>');
  if (isErrorPayload) return false;

  // 2. Phải có thẻ mở tài liệu HTML chuẩn (<!DOCTYPE html> hoặc <html>)
  const hasDoctypeOrHtml = /<!DOCTYPE html|<html/i.test(trimmed);
  if (!hasDoctypeOrHtml) return false;

  // 3. Phải có thẻ đóng kết thúc tài liệu (</html> hoặc </body>)
  const hasClosingTags = /<\/html>|<\/body>/i.test(trimmed);
  if (!hasClosingTags) return false;

  return true;
}

