import { prisma } from '../db';
import type { Company } from '@prisma/client';

export async function getCompany() {
  return prisma.company.findFirst();
}

export async function updateCompany(data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) {
  const company = await prisma.company.findFirst();
  
  if (company) {
    return prisma.company.update({
      where: { id: company.id },
      data,
    });
  }
  
  return prisma.company.create({ data });
}