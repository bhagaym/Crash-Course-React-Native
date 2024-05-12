import axios, { AxiosResponse } from "axios";
import { appAttribute } from "../constants";
import { Member } from "../models/Member";
import { renderAuth } from "../lib/myFunction";
import { router } from "expo-router";

const ENDPOINT = appAttribute.API_URL + "/member";

interface RegisterMemberData {
  nama_lengkap?: string;
  email?: string;
  password?: string;
  ulangi_password?: string;
}
interface registerMemberPromise {
  data: Member;
  message: string;
}

export const loginUser = (formData: RegisterMemberData): Promise<any> => {
  return new Promise((resolve, rejects) => {
    axios
      .post(ENDPOINT + "/login", formData)
      .then((response: AxiosResponse<registerMemberPromise>) => {
        resolve(response.data);
      })
      .catch((error) => {
        rejects(error.response ? error.response.data : error);
      });
  });
};
export const registerUser = (formData: RegisterMemberData): Promise<any> => {
  return new Promise((resolve, rejects) => {
    axios
      .post(ENDPOINT + "/register", formData)
      .then((response: AxiosResponse<registerMemberPromise>) => {
        resolve(response.data);
      })
      .catch((error) => {
        rejects(error.response ? error.response.data : error);
      });
  });
};
export const getCurrentUser = async (): Promise<any> => {
  const authorization = await renderAuth();

  return new Promise((resolve, rejects) => {
    axios
      .post(ENDPOINT + "/verify_token", {}, authorization)
      .then((response: AxiosResponse<registerMemberPromise>) => {
        resolve(response.data);
      })
      .catch((error) => {
        rejects(error.response ? error.response.data : error);
      });
  });
};

export const logoutUser = (id: string): Promise<any> => {
  return new Promise((resolve, rejects) => {
    axios
      .post(ENDPOINT + "/logout", { id: id })
      .then((response: AxiosResponse<registerMemberPromise>) => {
        resolve(response.data);
      })
      .catch((error) => {
        rejects(error.response ? error.response.data : error);
      });
  });
};
