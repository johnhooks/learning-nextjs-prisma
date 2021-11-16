export type Nullish = null | undefined;

export type Maybe<T> = T | Nullish;

export interface AccessTokenPayload {
  token: string;
  tokenExpires: string;
}

export type Status = "error" | "info" | "success" | "warning";
