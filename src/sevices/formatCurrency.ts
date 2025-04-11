export const formatCurrency = (amount: number | string | undefined): string => {
  if (!amount) return "0 ₫";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
};

// Hàm bổ sung để format số không có ký hiệu tiền tệ
export const formatNumber = (number: number | string | undefined): string => {
  if (!number) return "0";

  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(number));
};
