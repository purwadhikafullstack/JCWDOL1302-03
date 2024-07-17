import { Container, Service } from 'typedi';
import { API_KEY } from '@/config';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserQueries } from '@/queries/user.query';
import { AuthQueries } from '@/queries/auth.query';
import { httpException } from '@/exceptions/http.exception';
import { genSalt, hash, compare } from 'bcrypt';
import { Auth } from '@/interfaces/auth.interface';
import { CartQueries } from '@/queries/cart.query';
import { StoreQueries } from '@/queries/store.query';
import { getNearestStores } from '@/utils/store.utils';

@Service()
export class AuthActions {
  authQuery = Container.get(AuthQueries);
  userQuery = Container.get(UserQueries);
  cartQuery = Container.get(CartQueries);
  storeQuery = Container.get(StoreQueries);

  public registerAction = async (data: User) => {
    try {
      const existingUser = await this.userQuery.getUserByEmail(data.email);

      if (existingUser)
        throw new httpException(500, 'Email already registered!');

      const newUser = await this.authQuery.registerQuery(data.email);

      return newUser;
    } catch (e) {
      throw e;
    }
  };

  public resetConfirmationAction = async (data: User) => {
    try {
      const emailRequested = await this.authQuery.resetConfirmationQuery(
        data.email,
      );
      return emailRequested;
    } catch (e) {
      throw e;
    }
  };

  public updatePasswordAction = async (data: User) => {
    try {
      const salt = await genSalt(10);
      const hashPass = await hash(data.password, salt);
      await this.authQuery.updatePasswordQuery(data, hashPass);
    } catch (e) {
      throw e;
    }
  };

  public loginAction = async (data: Auth) => {
    try {
      const user = await this.userQuery.getUserByEmail(data.email);
      if (!user)
        throw new httpException(500, "Email or username doesn't exist!");
      const isValid = await compare(data.password, user.password);
      if (!isValid) throw new httpException(500, 'Password is invalid!');

      const userLocation = {
        longitude: data.longitude,
        latitude: data.latitude,
      };

      await this.userQuery.updateLocationUser(user.id, userLocation);

      const cart = await this.cartQuery.getCartByUserIDQuery(user.id);

      if (!cart?.id) {
        const storesPromise = this.storeQuery.getStoresQuery({});
        const { stores } = await storesPromise;

        const store = getNearestStores({ stores, userLocation });

        await this.cartQuery.createCartQuery({
          user_id: user.id,
          store_id: store?.id,
          totalAmount: 0,
        });
      }

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        name: user.name,
        gender: user.gender,
        birthDate: user.birthDate,
        verified: user.verified,
        role: user.role,
        referralCode: user.referralCode,
        longitude: user.longitude,
        latitude: user.latitude,
      };

      const token = sign(payload, String(API_KEY), { expiresIn: '1h' });
      return { user, token };
    } catch (err) {
      throw err;
    }
  };

  public refreshTokenAction = async (email: string) => {
    try {
      const user = await this.userQuery.getUserByEmail(email);
      if (!user) throw new httpException(500, 'Email not detected');
      const payload = {
        id: user.id,
        email: user!.email,
        username: user.username,
        name: user.name,
        verified: user.verified,
        gender: user.gender,
        birthDate: user.birthDate,
        profilePicture: user.profilePicture,
      };
      const token = sign(payload, String(API_KEY), { expiresIn: '1hr' });
      return { user, token };
    } catch (e) {
      throw e;
    }
  };

  public verifyAction = async (user: User) => {
    try {
      const salt = await genSalt(10);
      const hashPass = await hash(user.password, salt);
      const check = await this.userQuery.getUserByEmail(user.email);
      if (check?.verified === true) {
        throw new httpException(
          500,
          'Your account is already verified, you can access your account right now',
        );
      }
      await this.authQuery.verifyQuery(user, hashPass);
    } catch (e) {
      throw e;
    }
  };

  public adminLoginAction = async (data: Auth) => {
    try {
      const user = await this.userQuery.getUserByEmail(data.email);
     
      if (!user)
        throw new httpException(500, "Email or username doesn't exist!");
      const isValid = await compare(data.password, user.password);
      if (!isValid) throw new httpException(500, 'Password is invalid!');

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        name: user.name,
        gender: user.gender,
        birthDate: user.birthDate,
        verified: user.verified,
        role: user.role,
        referralCode: user.referralCode,
     
      };

      const token = sign(payload, String(API_KEY), { expiresIn: '1h' });
      return { user, token };
    } catch (err) {
      throw err;
    }
  };
}
