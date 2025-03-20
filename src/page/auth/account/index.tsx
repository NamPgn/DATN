/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import "./account.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UsersContext } from "../../../context/usersContext";
import {
  schemaChangePassWord,
  schemaUserInfo,
} from "../../../schema/userSchema";
import OrderHistory from "../../orders/orderHistory";
import Loading from "../../../components/Loading/Loading";
import { useMutation } from "react-query";
import { changeUserInfo } from "../../../sevices/users";
import { toast } from "react-toastify";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dkrn3fe2o/upload";
const CLOUDINARY_UPLOAD_PRESET = "sevenstyle";

const AccountSetting = () => {
  const { userId, isLoading, refetch }: any = useContext(UsersContext) || {};
  const [activeTab, setActiveTab] = useState("profile");
  const [avatar, setAvatar] = useState(userId?.avatar || ""); // Lưu ảnh đã upload
  const [uploading, setUploading] = useState(false); // Trạng thái upload

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaUserInfo) });

  useEffect(() => {
    reset(userId);
    setAvatar(userId?.avatar || "");
  }, [userId]);

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await changeUserInfo(data);
    },
    onSuccess: () => {
      toast.success("Sửa thành công");
      refetch();
    },
    onError: () => {
      toast.error("Sửa không thành công");
    },
  });

  const onSubmit = (data: any) => {
    const val = {
      ...data,
      avatar,
    };
    mutate(val);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setAvatar(data.secure_url);
        console.log("Uploaded Image URL:", data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="my-5">
            <h3>My Profile</h3>
            <hr />
          </div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Chỉnh sửa thông tin
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "history" ? "active" : ""
                }`}
                onClick={() => setActiveTab("history")}
              >
                Lịch sử đơn hàng
              </button>
            </li>
          </ul>
          <div className="file-upload mt-5">
            {activeTab === "profile" && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-5 gx-5">
                  <div className="col-xxl-8 mb-5 mb-xxl-0">
                    <div className="bg-secondary-soft px-4 rounded">
                      <div className="row g-3">
                        <h4 className="mb-4 mt-0">Contact Detail</h4>
                        <div className="col-md-6">
                          <label className="form-label">Name</label>
                          <input
                            {...register("name")}
                            className="form-control"
                          />
                          {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Username</label>
                          <input
                            disabled
                            {...register("username")}
                            className="form-control"
                          />
                          {errors.username && (
                            <p className="text-danger">
                              {errors.username.message}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email *</label>
                          <input
                            disabled
                            {...register("email")}
                            type="email"
                            className="form-control"
                          />
                          {errors.email && (
                            <p className="text-danger">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Avatar */}
                  <div className="col-xxl-4">
                    <div className="bg-secondary-soft px-4 rounded">
                      <h4 className="mb-4 mt-0 text-center">
                        Upload your profile photo
                      </h4>
                      <div className="text-center">
                        <div className="square position-relative display-2 mb-3">
                          {avatar ? (
                            <img
                              className="w-100 h-100 rounded"
                              src={avatar}
                              alt="Profile"
                            />
                          ) : (
                            <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
                          )}
                        </div>
                        <input
                          type="file"
                          id="customFile"
                          className="d-none"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <label
                          className="btn btn-success-soft"
                          htmlFor="customFile"
                        >
                          {uploading ? "Uploading..." : "Upload"}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gap-3 d-md-flex text-center mb-3 px-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Update profile
                  </button>
                </div>
              </form>
            )}

            {activeTab === "history" && <OrderHistory />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
