import { Response } from "@/service/index.types";
import { CustomError } from "./common.utils";

export const handleAsync =
  <T extends (...args: any[]) => Promise<Response<any>>>(asyncFn: T) =>
  async (
    ...args: Parameters<T>
  ): Promise<Response<Awaited<ReturnType<T>>["data"]>> => {
    try {
      return await asyncFn(...args);
    } catch (err) {
      console.error("Error:", err);

      const status = (err as CustomError)?.status || 500;
      const message = (err as CustomError)?.message;
      const error =
        err instanceof Error ? err : new Error(`Unknown error: ${String(err)}`);

      return { error, status, data: null, message: message || "Unknown error" };
    }
  };
