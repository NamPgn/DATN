import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  conName: z.string().min(1, "Vui lòng nhập tên"),
  conEmail: z.string().email("Email không hợp lệ"),
  conPhone: z.string().min(10, "Số điện thoại không hợp lệ"),
  message: z.string().min(5, "Nội dung yêu cầu quá ngắn"),
});

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <section className="stayConnected">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="secTitle">Stay Connected</h2>
              <p className="secDesc">
                Showing our latest arrival on this summer
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6">
              <div className="contactItems">
                <div className="contactItem">
                  <span>
                    <i className="fa-solid fa-location-dot" />
                  </span>
                  <h5>Địa chỉ</h5>
                  <p>Trường Sơn, Lục Nam, Bắc Giang</p>
                </div>
                <div className="contactItem">
                  <span>
                    <i className="fa-solid fa-phone" />
                  </span>
                  <h5>Số điện thoại</h5>
                  <p>+84 796 385 112</p>
                </div>
                <div className="contactItem">
                  <span>
                    <i className="fa-solid fa-envelope" />
                  </span>
                  <h5>Email</h5>
                  <p>phuongminhhoang77@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 offset-xl-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="post"
                className="contactForm"
                id="contact_form"
              >
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="required"
                      type="text"
                      {...register("conName")}
                      placeholder="Tên của bạn"
                    />
                    {errors.conName && (
                      <p className="text-red-500">{errors.conName.message}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      className="required"
                      type="email"
                      {...register("conEmail")}
                      placeholder="Email của bạn"
                    />
                    {errors.conEmail && (
                      <p className="text-red-500">{errors.conEmail.message}</p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      className="required"
                      type="text"
                      {...register("conPhone")}
                      placeholder="Số điện thoại"
                    />
                    {errors.conPhone && (
                      <p className="text-red-500">{errors.conPhone.message}</p>
                    )}
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="required"
                      {...register("message")}
                      placeholder="Yêu cầu hỗ trợ"
                    />
                    {errors.message && (
                      <p className="text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="ulinaBTN">
                      <span>Gửi</span>
                    </button>
                    <div className="alert con_message" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119163.64578231794!2d105.60306624335935!3d21.038129800000032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1737554411223!5m2!1svi!2s"
          width={1300}
          height={450}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default ContactPage;
