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
}

interface ApiResponse {
  data: {
    data: Voucher[];
  };
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
        setVoucherList(res.data?.data || []);
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
          {data.map((item) => (
            <article key={item.key} className="card fl-left">
              <section className="date">
                <time dateTime={item.startDate}>
                  <span>{item.day}</span>
                  <span>{item.month}</span>
                </time>
              </section>
              <section className="card-cont">
                <small>Voucher Event</small>
                <h3>{item.code}</h3>
                <div className="even-date">
                  <i className="fa fa-calendar" />
                  <time>
                    {item.startDate} - {item.expiryDate}
                  </time>
                </div>
                <div className="even-info">
                  <i className="fa fa-map-marker" />
                  <p>{item.description}</p>
                </div>
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
