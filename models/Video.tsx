import { User } from "./User";

export type Video = {
  $id: string;
  title?: string | undefined;
  thumbnail?: string;
  prompt?: string;
  video?: string;
  creator?: User;
}