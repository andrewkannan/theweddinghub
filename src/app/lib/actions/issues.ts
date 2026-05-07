"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addIssue(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const wedding = await prisma.wedding.findFirst({ where: { userId: session.user.id } })
  if (!wedding) throw new Error("Wedding not found")

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const priority = formData.get("priority") as string || "medium"
  
  await prisma.issue.create({
    data: {
      title,
      description,
      priority,
      status: "open",
      weddingId: wedding.id
    }
  })

  revalidatePath("/dashboard/issues")
}

export async function updateIssueStatus(id: string, status: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.issue.update({
    where: { id },
    data: { status }
  })

  revalidatePath("/dashboard/issues")
}

export async function deleteIssue(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.issue.delete({
    where: { id }
  })

  revalidatePath("/dashboard/issues")
}
