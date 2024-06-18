import { Response } from "@/service/index.types";
import { handleAsync } from "@/utils/async-handler";
import { useState } from "react";

export const useHandleAsync = <T extends (...args: any[]) => Promise<any>>(
  asyncFn: T
) => {
  const [isLoading, setIsLoading] = useState(false);
  return [handleAsync(asyncFn, setIsLoading), isLoading] as const;
};
