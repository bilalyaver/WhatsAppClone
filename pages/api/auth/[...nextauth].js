// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export default NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorizationUrl: process.env.NEXTAUTH_URL,
//     }),
//     // ...add more providers here
//   ],
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     async session({ session, token, user }) {
//       session.user.username = session.user.name
//         .split(" ")
//         .join("")
//         .toLocaleLowerCase();

//       session.user.uid = token.sub;

//       return session;
//     },
//   },
// });

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
})