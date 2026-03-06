import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const progress = await prisma.progress.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(progress);
}

export async function POST(req: Request) {
    const { part, episode, notes } = await req.json();
    const progress = await prisma.progress.create({
        data: {
            part: Number(part),
            episode: Number(episode),
            notes: notes || null
        }
    });
    return NextResponse.json(progress);
}