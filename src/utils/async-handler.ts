import { Response } from "@/service/index.types";

export const handleAsync =
  <T extends (...args: any[]) => Promise<Response<any>>>(asyncFn: T) =>
  async (
    ...args: Parameters<T>
  ): Promise<Response<Awaited<ReturnType<T>>["data"]>> => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      console.error("Error:", error);
      return {
        status: 500, // Error status code
        data: null,
        msg: "FAILED",
        error: (error as any).message || "Unknown error",
      };
    }
  };
