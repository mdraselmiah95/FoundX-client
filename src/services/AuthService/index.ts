"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/src/lib/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);
    if (data.success) {
      const cookieStore = cookies();
      cookieStore.set("accessToken", data.data.accessToken);
      cookieStore.set("refreshToken", data.data.refreshToken);
    }
    return data;
  } catch (err) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    if (data.success) {
      const cookieStore = cookies();
      cookieStore.set("accessToken", data.data.accessToken);
      cookieStore.set("refreshToken", data.data.refreshToken);
    }
    return data;
  } catch (err) {
    throw err instanceof Error ? err : new Error(String(err));
  }
};

export const logout = async () => {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const decoded = jwtDecode<any>(accessToken);
  return {
    _id: decoded._id,
    name: decoded.name,
    email: decoded.email,
    mobileNumber: decoded.mobileNumber,
    role: decoded.role,
    status: decoded.status,
    profilePhoto: decoded.profilePhoto,
  };
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = await cookies().get("refreshToken")?.value;
    const res = await axiosInstance.post(
      "/auth/refresh-token",
      {},
      {
        withCredentials: true,
        headers: { cookie: `refreshToken=${refreshToken}` },
      }
    );
    return res.data;
  } catch {
    throw new Error("Failed to get new access token");
  }
};
