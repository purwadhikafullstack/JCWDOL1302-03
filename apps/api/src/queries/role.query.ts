import { PrismaClient, Role } from '@prisma/client';
import { IRole } from '@/interfaces/role.interface';

const prisma = new PrismaClient();

export class RoleQueries {
  public createRoleQuery = async (data: IRole) => {
    try {
      const { role } = data;

      const roles = await prisma.role.create({
        data: {
          role,
        },
      });
      return roles;
    } catch (e) {
      throw e;
    }
  };

  public getRolesQuery = async (filters: {
    role?: string;
  }): Promise<IRole[]> => {
    try {
      const { role } = filters;

      const roles = await prisma.role.findMany({
        where: {
          role: { contains: role },
        },
      });
      return roles;
    } catch (e) {
      throw e;
    }
  };

  public updateRolesQuery = async (
    id: number,
    filters: {
      role?: string;
    },
  ): Promise<IRole> => {
    try {
      const updateRole = await prisma.role.update({
        where: { id },
        data: {
          ...filters,
        },
      });

      return updateRole;
    } catch (e) {
      throw e;
    }
  };

  public deleteRoleQuery = async (id: number): Promise<IRole> => {
    try {
      const deleteRole = await prisma.role.delete({
        where: { id },
      });
      return deleteRole;
    } catch (e) {
      throw e;
    }
  };
}
