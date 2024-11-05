import { prisma } from '../db';
import type { Invoice, InvoiceItem } from '@prisma/client';

export async function getInvoices() {
  return prisma.invoice.findMany({
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createInvoice(
  data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>,
  items: Omit<InvoiceItem, 'id' | 'invoiceId'>[]
) {
  return prisma.invoice.create({
    data: {
      ...data,
      items: {
        create: items,
      },
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function updateInvoice(
  id: string,
  data: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>,
  items: Omit<InvoiceItem, 'id' | 'invoiceId'>[]
) {
  // Delete existing items
  await prisma.invoiceItem.deleteMany({
    where: { invoiceId: id },
  });

  return prisma.invoice.update({
    where: { id },
    data: {
      ...data,
      items: {
        create: items,
      },
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function deleteInvoice(id: string) {
  await prisma.invoiceItem.deleteMany({
    where: { invoiceId: id },
  });

  return prisma.invoice.delete({
    where: { id },
  });
}