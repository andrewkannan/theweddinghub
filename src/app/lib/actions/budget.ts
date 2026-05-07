"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addBudgetItem(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const wedding = await prisma.wedding.findFirst({ where: { userId: session.user.id } })
  if (!wedding) throw new Error("Wedding not found")

  const category = formData.get("category") as string
  const itemName = formData.get("itemName") as string
  const estimatedCost = parseFloat(formData.get("estimatedCost") as string) || 0
  const actualCost = parseFloat(formData.get("actualCost") as string) || 0
  const amountPaid = parseFloat(formData.get("amountPaid") as string) || 0
  const dueDateStr = formData.get("dueDate") as string
  const dueDate = dueDateStr ? new Date(dueDateStr) : null

  await prisma.budgetItem.create({
    data: {
      category,
      itemName,
      estimatedCost,
      actualCost,
      dueDate,
      weddingId: wedding.id,
      ...(amountPaid > 0 ? {
        payments: {
          create: {
            amount: amountPaid,
            date: new Date(),
          }
        }
      } : {})
    }
  })

  revalidatePath("/dashboard/budget")
}

export async function deleteBudgetItem(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.budgetItem.delete({
    where: { id }
  })

  revalidatePath("/dashboard/budget")
}
