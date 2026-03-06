import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const [count, latest] = await Promise.all([
        prisma.sin.count(),
        prisma.sin.findFirst({ orderBy: { createdAt: "desc" } }),
    ]);
    return NextResponse.json({ count, latest: latest?.title ?? null });
}