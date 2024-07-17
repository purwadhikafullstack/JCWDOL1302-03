import prisma from '@/prisma';
import {
  IAdmin,
  IFilterAdmin,
  ResultAdmin,
} from '@/interfaces/admin.interface';
import { Admin } from '@prisma/client';

export class AdminQueries {
  async getAdminByEmailOrUsername(username: string, email: string) {
    try {
      const admin = await prisma.admin.findFirst({
        // include:{
        //   store: true
        // },
        where: {
          OR: [
            { email: email },
            {
              username: username,
            },
          ],
        },
      });
      return admin;
    } catch (e) {
      throw e;
    }
  }

  public getAdminByEmail = async (email: string) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });
      return admin;
    } catch (e) {
      throw e;
    }
  };

  public getAdminByIDQuery = async (id: number) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          id: id,
        },
      });
      return admin;
    } catch (e) {
      throw e;
    }
  };

  public getAllAdminQuery = async (
    filters: IFilterAdmin,
  ): Promise<ResultAdmin> => {
    try {
      const { email = '', page = 1, pageSize = 10000 } = filters;
      const skip = Number(page) > 1 ? (Number(page) - 1) * Number(pageSize) : 0;
      const take = Number(pageSize);

      const admins = await prisma.admin.findMany({
        include: {
          role: {
            select: {
              id: true,
              role: true,
            },
          },
        },
        where: {
          email: { contains: email },
        },
        skip,
        take,
      });

      const data = await prisma.admin.aggregate({
        _count: {
          id: true,
        },
        where: {
          email: {
            contains: email,
          },
        },
      });
      const count = data._count.id;
      const pages = Math.ceil(count / pageSize);

      return { admins, pages };
    } catch (e) {
      throw e;
    }
  };

  public createAdminQuery = async (adminData: IAdmin): Promise<Admin> => {
    try {
      const createAdmin = await prisma.$transaction(
        async (prisma) => {
          try {
            const admin = await prisma.admin.create({
              data: {
                ...adminData,
              },
            });
            return admin;
          } catch (e) {
            throw e;
          }
        },
        {
          maxWait: 5000,
          timeout: 10000,
        },
      );
      return createAdmin;
    } catch (e) {
      throw e;
    }
  };

  public updateAdminQuery = async (
    id: number,
    adminData: IAdmin,
  ): Promise<Admin> => {
    try {
      const updateAdmin = await prisma.admin.update({
        data: {
          ...adminData,
        },
        where: {
          id,
        },
      });
      return updateAdmin;
    } catch (e) {
      throw e;
    }
  };

  public deleteAdminQuery = async (id: number): Promise<IAdmin> => {
    try {
      const deleteAdmin = await prisma.admin.delete({
        where: { id },
      });
      return deleteAdmin;
    } catch (e) {
      throw e;
    }
  };
}
