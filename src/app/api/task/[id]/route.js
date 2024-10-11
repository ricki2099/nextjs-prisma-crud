import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const { id } = params;
  const getTask = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!getTask) {
    return NextResponse.json({ message: "Tarea no encontrada" });
  } else {
    return NextResponse.json(getTask);
  }
}
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const updateTask = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    return NextResponse.json(updateTask);
  } catch (error) {
    return NextResponse.json({
      message: "Tarea no encontrada para actualizar",
      error: error.message,
    });
  }
}
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const deleteTask = await prisma.task.delete({ where: { id: Number(id) } });
    return NextResponse.json(deleteTask);
  } catch (error) {
    return NextResponse.json({
      message: "Tarea no encontrada para eliminar",
      error: error.message,
    });
  }
}
