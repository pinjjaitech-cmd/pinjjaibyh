import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "@/lib/db"
import UserModel from "@/models/User"
import bcryptjs from "bcryptjs"

// Super admin credentials from environment variables
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [ 
    Credentials({
      credentials: {
        email: {type: "email"},
        password: {type: "password"}
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // Check for super admin credentials first
          if (SUPER_ADMIN_EMAIL && SUPER_ADMIN_PASSWORD) {
            if (credentials.email === SUPER_ADMIN_EMAIL && credentials.password === SUPER_ADMIN_PASSWORD) {
              return {
                id: "super-admin",
                email: SUPER_ADMIN_EMAIL,
                name: "Super Admin",
                role: "super_admin",
                isVerified: true
              }
            }
          }

          // If not super admin, try database authentication
          try {
            await connectDB()

            const user = await UserModel.findOne({ email: credentials.email }).select('+password')

            if (!user) {
              return null
            }

            if (!user.isVerified) {
              throw new Error("Please verify your email before logging in")
            }

            const isPasswordValid = await bcryptjs.compare(
              credentials.password as string,
              user.password
            )

            if (!isPasswordValid) {
              return null
            }

            return {
              id: user._id.toString(),
              email: user.email,
              name: user.fullName,
              role: user.role,
              isVerified: user.isVerified
            }
          } catch (dbError) {
            console.error("Database auth error:", dbError)
            // If database connection fails, return null for non-super admin users
            return null
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
   ],
   session: {
    strategy: "jwt"
   },
   callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.isVerified = user.isVerified
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.isVerified = token.isVerified as boolean
      }
      return session
    }
   }
})
