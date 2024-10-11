import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const task = await prisma.task.findMany();
  if (!task) {
    return NextResponse.json({ message: "Tareas no encontradas" });
  } else {
    return NextResponse.json(task);
  }
}

export async function POST(request) {
  const { title, description } = await request.json();
  const newTask = await prisma.task.create({
    data: {
      title: title,
      description: description,
    },
  });
  if (!newTask) {
    return NextResponse.json({ message: "Tarea no encontrada" });
  } else {
    return NextResponse.json(newTask);
  }
}
