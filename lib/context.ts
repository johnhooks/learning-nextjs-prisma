import type { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface Context {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
}
