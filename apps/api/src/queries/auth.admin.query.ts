import { Auth } from '@/interfaces/auth.interface';
import prisma from '@/prisma';

export class AuthAdminQueries {
  public async adminLoginQuery(data: Auth) {
    try {
      const admin = await prisma.admin.findUnique({
        select: {
          id: true,
          email: true,
          username: true,
          role_id: true,
        },
        where: {
          email: data.email,
          password: data.password,
        },
      });
      return admin;
    } catch (e) {
      throw e;
    }
  }
}
