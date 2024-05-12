import axios, { AxiosResponse } from "axios";
import { appAttribute } from "../constants";
import { Member } from "../models/Member";
import { errorSystem, renderAuth } from "../lib/myFunction";

const ENDPOINT = appAttribute.API_URL + "/member";

interface registerMemberPromise {
  data: Member;
  message: string;
}

export const updateProfile = async (formData: Member) => {
  const authorization = await renderAuth();

  return new Promise((resolve, rejects) => {
    axios
      .post(ENDPOINT + "/update_profile", formData, authorization)
      .then((response: AxiosResponse<registerMemberPromise>) => {
        resolve(response.data);
      })
      .catch((error) => {
        errorSystem(error, rejects);
      });
  });
};
