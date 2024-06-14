export type Response<T = unknown, E = any> = {
  status: number;
  data: T | null;
  msg: "SUCCESS" | "FAILED";
  error?: E;
};
