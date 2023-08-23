import { signedOutAuthObject } from "@clerk/nextjs/api";
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

export const generateServerSideHelpers = () =>
createServerSideHelpers({
    router: appRouter,
    ctx: { prisma,  auth: signedOutAuthObject()  },
    transformer: superjson, // optional - adds superjson serialization
  });
