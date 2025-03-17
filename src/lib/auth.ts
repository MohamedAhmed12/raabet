// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// // import { prisma } from './libs/prismaDB'; // Adjust the path as needed
// import bcrypt from 'bcryptjs';

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         // if (!credentials?.email || !credentials.password) {
//         //   return null;
//         // }

//         // const user = await prisma.user.findUnique({
//         //   where: { email: credentials.email },
//         // });

//         // if (user && await bcrypt.compare(credentials.password, user.hashedPassword)) {
//         //   return { id: user.id, email: user.email, name: user.name };
//         // }2fads.
//         return {id:1,fullname:'dfasdf',email:'dfsa@sdafa.com'}
//         return null;
//       },
//     }),
//   ],
//   session: { strategy: 'jwt' },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id;
//         session.user.email = token.email;
//         session.user.name = token.name;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: { signIn: '/auth/signin' },
// };

// export default NextAuth(authOptions);

import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = { id: 2, fullname: "fdsfa" };
        return user;
      },
    }),
  ],
  // Additional NextAuth.js configuration
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
