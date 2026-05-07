"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addGuest(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const wedding = await prisma.wedding.findFirst({ where: { userId: session.user.id } })
  if (!wedding) throw new Error("Wedding not found")

  const firstName = formData.get("name") as string
  const side = formData.get("side") as string
  const rsvpStatus = formData.get("rsvpStatus") as string || "pending"
  const paxCount = parseInt(formData.get("paxCount") as string) || 1
  const dietaryNotes = formData.get("dietaryNotes") as string
  const groupName = formData.get("groupName") as string

  await prisma.guest.create({
    data: {
      firstName,
      side,
      rsvpStatus,
      paxCount,
      dietaryNotes,
      groupName,
      weddingId: wedding.id
    }
  })

  revalidatePath("/dashboard/guests")
}

export async function deleteGuest(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.guest.delete({
    where: { id }
  })

  revalidatePath("/dashboard/guests")
}
