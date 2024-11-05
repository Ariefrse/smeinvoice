import { prisma } from '../db';
import type { Payment } from '@prisma/client';

export async function getPayments() {
  return prisma.payment.findMany({
    include: {
      customer: true,
      invoice: true,
    },
    orderBy: { date: 'desc' },
  });
}

export async function createPayment(data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.payment.create({
    data,
    include: {
      customer: true,
      invoice: true,
    },
  });
}

export async function updatePayment(id: string, data: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.payment.update({
    where: { id },
    data,
    include: {
      customer: true,
      invoice: true,
    },
  });
}

export async function deletePayment(id: string) {
  return prisma.payment.delete({
    where: { id },
  });
}