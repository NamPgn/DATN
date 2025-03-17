/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./style.css";
import { Button, message } from "antd";

interface Voucher {
  id: number;
  code: string;
  name: string;
  description: string;
  start_date: string;
  expiry_date: string;
  for_logged_in_users: number | string;
}

interface ApiResponse {
  data: Voucher[];
}

interface FeatureSectionProps {
  vouchers: (page: number) => Promise<ApiResponse>;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ vouchers }) => {
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await vouchers(1);
        setVoucherList(res.data?.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch vouchers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVouchers();
  }, [vouchers]);
  const data = voucherList.map((item) => ({
    key: item.id,
    day: new Date(item.start_date).getDate(),
    month: new Date(item.start_date).toLocaleDateString("default", {
      month: "short",
    }),
    code: item.code,
    for_logged_in_users: item.for_logged_in_users,
    startDate: new Date(item.start_date).toLocaleDateString(),
    expiryDate: new Date(item.expiry_date).toLocaleDateString(),
    description: item.description,
  }));

  return (
    <section className="container my-5">
      <h1>Voucher</h1>
      {isLoading ? (
        <p>Loading vouchers...</p>
      ) : (
        <div className="row">
          {data.map((item: any) => (
            <article key={item.key} className="card fl-left my-3 mx-1">
              <section className="date">
                <time dateTime={item.startDate}>
                  <span>{item.day}</span>
                  <span>{item.month}</span>
                </time>
              </section>
              <section className="card-cont">
                <small>Voucher Event</small>
                <h3>{item.code}</h3>
                <h3>{item.name}</h3>
                <div className="even-date">
                  <i className="fa fa-calendar" />
                  <time
                    style={{ marginLeft: "10px", display: "block" }}
                    className="mb-2"
                  >
                    {item.startDate} - {item.expiryDate}
                  </time>
                </div>
                {item.for_logged_in_users == 1 ? (
                  <div className="even-info">
                    <i className="fa fa-map-marker" />
                    <p>Cần đăng nhập</p>
                  </div>
                ) : (
                  ""
                )}

                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    navigator.clipboard.writeText(item.code);
                    message.success(
                      `Mã Voucher "${item.code}" Bạn đã thành công sao chép`
                    );
                  }}
                >
                  Copy Voucher
                </Button>
              </section>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeatureSection;
