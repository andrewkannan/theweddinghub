"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addVendor(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const wedding = await prisma.wedding.findFirst({ where: { userId: session.user.id } })
  if (!wedding) throw new Error("Wedding not found")

  const name = formData.get("name") as string
  const category = formData.get("category") as string
  const contactInfo = formData.get("contactInfo") as string
  const quotedPrice = parseFloat(formData.get("quotedPrice") as string) || 0
  const finalPrice = parseFloat(formData.get("finalPrice") as string) || 0

  await prisma.vendor.create({
    data: {
      name,
      category,
      contactInfo,
      quotedPrice,
      finalPrice,
      weddingId: wedding.id
    }
  })

  revalidatePath("/dashboard/vendors")
}

export async function deleteVendor(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.vendor.delete({
    where: { id }
  })

  revalidatePath("/dashboard/vendors")
}
