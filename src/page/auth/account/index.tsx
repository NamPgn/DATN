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

const AccountSetting = () => {
  const { userId }: any = useContext(UsersContext) || {};
  const [activeTab, setActiveTab] = useState("profile");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaUserInfo) });
  useEffect(() => {
    (() => {
      reset(userId);
    })();
  }, [userId]);
  const {
    register: res,
    handleSubmit: handleSubmitChangePass,
    formState: { errors: err },
  } = useForm({ resolver: zodResolver(schemaChangePassWord) });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const onSubmitChangePassWord = (data: any) => {
    console.log(data);
  };
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
                  activeTab === "password" ? "active" : ""
                }`}
                onClick={() => setActiveTab("password")}
              >
                Thay đổi mật khẩu
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
                  <div className="col-xxl-4">
                    <div className="bg-secondary-soft px-4 rounded">
                      <h4 className="mb-4 mt-0 text-center">
                        Upload your profile photo
                      </h4>

                      <div className="text-center">
                        <div className="square position-relative display-2 mb-3">
                          {userId?.avatar ? (
                            <img
                              className="w-100 h-100"
                              src={userId?.avatar}
                              alt=""
                            />
                          ) : (
                            <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
                          )}
                        </div>
                        <input
                          {...register("avatar")}
                          type="file"
                          id="customFile"
                          hidden
                        />
                        <label
                          className="btn btn-success-soft"
                          htmlFor="customFile"
                        >
                          Upload
                        </label>
                        {errors.avatar && (
                          <p className="text-danger">{errors.avatar.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gap-3 d-md-flex text-center mb-3 px-4">
                  <button className="btn btn-primary btn-lg">
                    Update profile
                  </button>
                </div>
              </form>
            )}
            {activeTab === "password" && (
              <form onSubmit={handleSubmitChangePass(onSubmitChangePassWord)}>
                <div className="row mb-5 gx-5">
                  <div className="col-xxl-6">
                    <div className="bg-secondary-soft px-4 rounded">
                      <div className="row g-3">
                        <h4 className="my-4">Change Password</h4>
                        <div className="col-md-6">
                          <label className="form-label">Old password *</label>
                          <input
                            type="password"
                            className="form-control"
                            {...res("oldPassword")}
                          />
                          <p className="text-danger">
                            {err.oldPassword?.message}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">New password *</label>
                          <input
                            type="password"
                            className="form-control"
                            {...res("newPassword")}
                          />
                          <p className="text-danger">
                            {err.newPassword?.message}
                          </p>
                        </div>
                        <div className="col-md-12">
                          <label className="form-label">
                            Confirm Password *
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            {...res("confirmPassword")}
                          />
                          <p className="text-danger">
                            {err.confirmPassword?.message}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="gap-3 d-md-flex text-center mb-3 px-4 mt-5">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Update profile
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {activeTab === "history" && <OrderHistory />}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
