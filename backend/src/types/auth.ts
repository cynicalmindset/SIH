export interface AuthUser {
  userId: string;
  role: "ADMIN" | "ANALYST" | "VIEWER";
}