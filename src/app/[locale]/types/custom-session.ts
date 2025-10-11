import { SessionContextValue } from "next-auth/react";

export type CustomServerSession = {
  user: {
    email: string;
    sub: string;
    id: {
      id: string;
      fullname: string;
      email: string;
      password: string;
      avatar: string;
      is_confirmed: boolean;
      resetToken: string | null;
      resetTokenExpires: string | null;
      stripeCustomerId: string | null;
    };
    iat: number;
    exp: number;
    jti: string;
  };
};

export type CustomClientSession = SessionContextValue & {
  data?: { user?: { id: string } };
};
