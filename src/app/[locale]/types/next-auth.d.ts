import { User as NextAuthUser } from "next-auth";
import { Link } from "../store/use-link-store";

declare module "next-auth" {
  interface User extends NextAuthUser {
    id: string;
    fullname: string;
    avatar: string;
    links?: Link[];
  }
}
