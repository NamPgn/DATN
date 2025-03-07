import { z } from "zod";

export const schemaUserInfo = z.object({
  name: z.string().min(1, "First Name is required"),
  username: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format"),
  avatar: z
    .instanceof(FileList)
    .refine((files: any) => files.length > 0, "Profile photo is required"),
});

export const schemaChangePassWord = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
