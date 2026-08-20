import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE = "vp_admin";
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret-in-env-file-please-vardhman"
);

export type AdminPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function signToken(payload: AdminPayload) {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token?: string | null): Promise<AdminPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}
