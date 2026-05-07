"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addScheduleItem(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const wedding = await prisma.wedding.findFirst({ where: { userId: session.user.id } })
  if (!wedding) throw new Error("Wedding not found")

  const title = formData.get("title") as string
  const location = formData.get("location") as string
  const description = formData.get("description") as string
  
  const startTimeStr = formData.get("startTime") as string
  const endTimeStr = formData.get("endTime") as string
  
  const startTime = new Date(startTimeStr)
  const endTime = new Date(endTimeStr)

  await prisma.schedule.create({
    data: {
      title,
      location,
      description,
      startTime,
      endTime,
      weddingId: wedding.id
    }
  })

  revalidatePath("/dashboard/schedule")
}

export async function deleteScheduleItem(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.schedule.delete({
    where: { id }
  })

  revalidatePath("/dashboard/schedule")
}
