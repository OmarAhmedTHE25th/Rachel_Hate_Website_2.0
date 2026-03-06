import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const sins = await prisma.sin.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(sins);
}

export async function POST(req: Request) {
    const { title, description, episode } = await req.json();
    const sin = await prisma.sin.create({
        data: { title, description, episode: episode || null }
    });
    return NextResponse.json(sin);
}