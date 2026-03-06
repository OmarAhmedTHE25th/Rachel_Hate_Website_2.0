import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    const sin = await prisma.sin.create({
        data: { title: "Unspecified act of treachery", description: "Details pending investigation" }
    });
    return NextResponse.json(sin);
}
export async function DELETE() {
    const latest = await prisma.sin.findFirst({ orderBy: { createdAt: "desc" } });
    if (!latest) return NextResponse.json({ error: "nothing to undo" }, { status: 404 });
    await prisma.sin.delete({ where: { id: latest.id } });
    return NextResponse.json({ deleted: true });
}