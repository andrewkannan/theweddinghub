"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addTask(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const wedding = await prisma.wedding.findFirst({ where: { userId: session.user.id } })
  if (!wedding) throw new Error("Wedding not found")

  const title = formData.get("title") as string
  const priority = formData.get("priority") as string || "medium"
  const deadlineStr = formData.get("deadline") as string
  const deadline = deadlineStr ? new Date(deadlineStr) : null

  await prisma.task.create({
    data: {
      title,
      priority,
      deadline,
      status: "todo",
      weddingId: wedding.id
    }
  })

  revalidatePath("/dashboard/tasks")
}

export async function updateTaskStatus(id: string, status: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.task.update({
    where: { id },
    data: { status }
  })

  revalidatePath("/dashboard/tasks")
}

export async function deleteTask(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.task.delete({
    where: { id }
  })

  revalidatePath("/dashboard/tasks")
}
