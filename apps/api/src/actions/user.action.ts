import { FilterUser, IResultUser } from '@/interfaces/userfilter.interface';
import { UserQueries } from '@/queries/user.query';
import { User } from '@/types';
import { genSalt, hash } from 'bcrypt';
import { Service, Container } from 'typedi';

@Service()
export class UserActions {
  userQueries = Container.get(UserQueries);
  public updateUserAction = async (
    id: number,
    data: User,
    profilePicture: string,
  ) => {
    try {
      const salt = await genSalt(10);
      const hashPass = await hash(data.password, salt);
      const user = await this.userQueries.updateUserQuery(
        id,
        data,
        profilePicture,
        hashPass,
      );
      return user;
    } catch (e) {
      throw e;
    }
  };

  public getAllUserAction = async (
    filters: FilterUser,
  ): Promise<IResultUser> => {
    try {
      const data = await this.userQueries.getAllUserQuery(filters);
      return data;
    } catch (e) {
      throw e;
    }
  };

  public getAllEmailUserAction = async (verified?: boolean) => {
    try {
      const emails = await this.userQueries.getAllEmailUser(verified);
      return emails;
    } catch (e) {
      throw e;
    }
  };
}
