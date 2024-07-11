import { UpdateUser, UserLocation } from '@/interfaces/user.interface';
import { FilterUser, IResultUser } from '@/interfaces/userfilter.interface';
import prisma from '@/prisma';

export class UserQueries {
  async getUserByEmailOrUsername(username: string, email: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
            {
              username: username,
            },
          ],
        },
      });
      return user;
    } catch (e) {
      throw e;
    }
  }

  public getUserByEmail = async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (e) {
      throw e;
    }
  };

  public updateUserQuery = async (
    id: number,
    data: UpdateUser,
    profilePicture: string,
    pass: string,
  ) => {
    try {
      await prisma.$transaction(async (prisma) => {
        const user = prisma.user.update({
          data: {
            ...data,
            birthDate: data.birthDate ? new Date(data.birthDate) : '',
            profilePicture: profilePicture,
            password: pass,
          },
          where: {
            id,
          },
        });
        return user;
      });
    } catch (e) {
      throw e;
    }
  };

  public updateLocationUser = async (id: number, location: UserLocation) => {
    try {
      await prisma.$transaction(async (prisma) => {
        const userLocation = await prisma.user.update({
          data: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          where: {
            id,
          },
        });
        return userLocation;
      });
    } catch (e) {
      throw e;
    }
  };

  public getAllUserQuery = async (
    filters: FilterUser,
  ): Promise<IResultUser> => {
    try {
      const { email = '', page = 1, pageSize = 1000 } = filters;
      const skip = Number(page) > 1 ? (Number(page) - 1) * Number(pageSize) : 0;
      const take = Number(pageSize);

      const users = await prisma.user.findMany({
        where: {
          email: {
            contains: email,
          },
        },
        skip,
        take,
      });

      const data = await prisma.user.aggregate({
        _count: {
          id: true,
        },
        where: {
          name: {
            contains: email,
          },
        },
      });
      const count = data._count.id;
      const pages = Math.ceil(count / pageSize);

      return { users, pages };
    } catch (e) {
      throw e;
    }
  };

  public getAllEmailUser = async (verified?: boolean) => {
    try {
      const emails = await prisma.user.findMany({
        where: {
          verified: verified !== undefined ? verified : true,
        },
        select: {
          email: true,
        },
      });
      return emails.map((user) => user.email);
    } catch (e) {
      throw e;
    }
  };
}
