import { prisma } from '../db';
import type { Customer } from '@prisma/client';

export async function getCustomers() {
  return prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function createCustomer(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.customer.create({ data });
}

export async function updateCustomer(id: string, data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) {
  return prisma.customer.update({
    where: { id },
    data,
  });
}

export async function deleteCustomer(id: string) {
  return prisma.customer.delete({
    where: { id },
  });
}