/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import { useQuery } from "react-query";
import { useContext, useState } from "react";
import TailwindComponent from "../../Tailwind/TailwinComponent";
import { styles } from "../../../styles/colors";
import { UsersContext } from "../../../context/usersContext";

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
  const [copiedCodes, setCopiedCodes] = useState<{ [key: number]: boolean }>(
    {}
  );

  const { isLogin }: any = useContext(UsersContext) || {};

  const { data: voucherList, isLoading }: any = useQuery({
    queryKey: ["VOUCHERCL"],
    queryFn: async () => {
      return (await vouchers(1)).data || [];
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const handleCopyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    message.success(`Mã Voucher "${code}" đã được sao chép thành công`);
    setCopiedCodes((prev) => ({ ...prev, [id]: true }));
  };

  const getButtonColor = (forLoggedInUsers: number, isCodeCopied: boolean) => {
    if (forLoggedInUsers == 1) return styles.colors.primary;
    return isCodeCopied ? styles.colors.disabled : styles.colors.secondary;
  };

  const data = voucherList?.map((item: any) => ({
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
    <TailwindComponent>
      <section className="container mx-auto py-8">
        <h1 className={`text-2xl font-bold ${styles.colors.text.primary} mb-8`}>
          Mã Giảm Giá
        </h1>
        {isLoading ? (
          <p>Loading vouchers...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item: any) => (
              <article key={item.key} className="relative">
                <div className="bg-white rounded-lg overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-between">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${styles.colors.background} rounded-full`}
                      />
                    ))}
                  </div>

                  <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-between">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${styles.colors.background} rounded-full`}
                      />
                    ))}
                  </div>

                  <div className="px-6 py-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <small
                          className={`text-[${styles.colors.primary}] text-xs font-semibold uppercase`}
                        >
                          Mã giảm giá
                        </small>
                        <h3
                          className={`text-lg font-semibold ${styles.colors.text.primary} mt-1`}
                        >
                          {item.code}
                        </h3>
                        <p
                          className={`text-sm ${styles.colors.text.secondary} mt-1`}
                        >
                          {item.description}
                        </p>
                      </div>
                      <div
                        className={`w-14 h-14 bg-[${styles.colors.primary}] rounded-full flex flex-col items-center justify-center text-white font-bold`}
                      >
                        <span className="text-xl leading-none">{item.day}</span>
                        <span className="text-xs uppercase">{item.month}</span>
                      </div>
                    </div>

                    <div
                      className={`border-t border-dashed ${styles.colors.border} pt-4`}
                    >
                      <div
                        className={`flex items-center ${styles.colors.text.secondary} text-sm mb-4`}
                      >
                        <i
                          className={`fa fa-calendar text-[${styles.colors.primary}] mr-2`}
                        />
                        <span>
                          {item.startDate} - {item.expiryDate}
                        </span>
                      </div>

                      <div>
                        <button
                          className={`h-10 font-semibold border-none px-7 ${styles.colors.text.white} font-sm rounded-md`}
                          style={{
                            backgroundColor: getButtonColor(
                              item.for_logged_in_users,
                              copiedCodes[item.key]
                            ),
                          }}
                          onClick={() => {
                            if (item.for_logged_in_users == 1 && !isLogin) {
                              message.info(
                                "Vui lòng đăng nhập để sử dụng voucher"
                              );
                            } else {
                              handleCopyCode(item.code, item.key);
                            }
                          }}
                        >
                          {item.for_logged_in_users == 1 && !isLogin
                            ? "Đăng Nhập"
                            : copiedCodes[item.key]
                            ? "Đã Sao Chép"
                            : "Sao Chép Mã"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </TailwindComponent>
  );
};

export default FeatureSection;
