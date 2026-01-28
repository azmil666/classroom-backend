import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from '../db/schema/auth'

const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
if (!BETTER_AUTH_SECRET || !FRONTEND_URL) {
      throw new Error("BETTER_AUTH_SECRET and FRONTEND_URL must be set");
    }
export const auth = betterAuth({
    secret: BETTER_AUTH_SECRET,
    trustedOrigins: [FRONTEND_URL],
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string", required: true, defaultValue: "student", input: false,
            },
            imageCldPubId: {
                type: "string", required: false, input: true,
            },
        }
    }
});