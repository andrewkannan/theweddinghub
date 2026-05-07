const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  // Create a user
  const hashedPassword = await bcrypt.hash('AML!Task12', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@unionplanner.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      name: 'Demo User',
      email: 'demo@unionplanner.com',
      password: hashedPassword,
    },
  })

  // Create a wedding
  const wedding = await prisma.wedding.create({
    data: {
      name: 'Sarah & John\'s Wedding',
      date: new Date(new Date().setMonth(new Date().getMonth() + 6)), // 6 months from now
      budget: 35000,
      userId: user.id,
      
      budgetItems: {
        create: [
          { category: 'Venue', itemName: 'Grand Hall', estimatedCost: 15000, actualCost: 15000, amountPaid: 5000, dueDate: new Date() },
          { category: 'Catering', itemName: 'Gourmet Feast', estimatedCost: 8000, actualCost: 0, amountPaid: 0 },
          { category: 'Photography', itemName: 'Capture Moments', estimatedCost: 3000, actualCost: 3200, amountPaid: 1000 },
          { category: 'Attire', itemName: 'Wedding Dress', estimatedCost: 2000, actualCost: 2500, amountPaid: 2500 },
        ]
      },
      
      vendors: {
        create: [
          { name: 'Grand Hall Estate', category: 'Venue', contactInfo: 'contact@grandhall.com', quotedPrice: 15000, finalPrice: 15000 },
          { name: 'Capture Moments', category: 'Photography', contactInfo: 'photo@capture.com', quotedPrice: 3000, finalPrice: 3200 },
        ]
      },

      tasks: {
        create: [
          { title: 'Book Venue', priority: 'high', status: 'done', deadline: new Date() },
          { title: 'Send Invitations', priority: 'high', status: 'todo', deadline: new Date(new Date().setMonth(new Date().getMonth() + 2)) },
          { title: 'Tasting menu', priority: 'medium', status: 'in_progress' },
        ]
      },

      guests: {
        create: [
          { name: 'Alice Smith', side: 'bride', rsvpStatus: 'confirmed', paxCount: 2, dietaryNotes: 'Vegetarian' },
          { name: 'Bob Johnson', side: 'groom', rsvpStatus: 'pending', paxCount: 1 },
          { name: 'Charlie Davis', side: 'bride', rsvpStatus: 'declined', paxCount: 0 },
          { name: 'Diana Evans', side: 'groom', rsvpStatus: 'confirmed', paxCount: 4, tableNumber: '1' },
        ]
      },

      schedules: {
        create: [
          { title: 'Ceremony', startTime: new Date(new Date().setHours(14, 0, 0, 0)), endTime: new Date(new Date().setHours(15, 0, 0, 0)), location: 'Garden' },
          { title: 'Cocktail Hour', startTime: new Date(new Date().setHours(15, 0, 0, 0)), endTime: new Date(new Date().setHours(16, 30, 0, 0)), location: 'Terrace' },
          { title: 'Reception Dinner', startTime: new Date(new Date().setHours(17, 0, 0, 0)), endTime: new Date(new Date().setHours(20, 0, 0, 0)), location: 'Grand Hall' },
        ]
      },

      issues: {
        create: [
          { title: 'Caterer unconfirmed', description: 'Need to finalize the menu before next week', priority: 'high', status: 'open' },
        ]
      }
    }
  })

  // Add payments to vendors
  const venue = await prisma.vendor.findFirst({ where: { name: 'Grand Hall Estate' } })
  if (venue) {
    await prisma.payment.create({
      data: {
        amount: 5000,
        date: new Date(),
        notes: 'Deposit',
        vendorId: venue.id
      }
    })
  }

  console.log(`Seeding finished. User: demo@unionplanner.com / AML!Task12`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
