import { Container, Service } from 'typedi';
import { API_KEY } from '@/config';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { AuthAdminQueries } from '@/queries/auth.admin.query';
import { UserQueries } from '@/queries/user.query';
import { AuthQueries } from '@/queries/auth.query';
import { httpException } from '@/exceptions/http.exception';
import { genSalt, hash, compare } from 'bcrypt';
import { Auth } from '@/interfaces/auth.interface';
import { AdminQueries } from '@/queries/admin.query';

@Service()
export class AuthAdminActions {
  authQuery = Container.get(AuthQueries);
  userQuery = Container.get(UserQueries);
  authAdminQuery = Container.get(AuthAdminQueries);
  adminQuery = Container.get(AdminQueries);

  public adminLoginAction = async (data: Auth) => {
    try {
      
      const admin = await this.adminQuery.getAdminByEmail(data.email);
      // console.log("============",admin)
      if (!admin) throw new httpException(500, "Email doesn't exist!");
      //   const isValid = await compare(data.password, admin.password);
      //   if (!isValid) throw new httpException(500, 'Password is invalid!');

      const payload = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role_id: admin.role_id,
        // store: ""
      };

      const token = sign(payload, String(API_KEY), { expiresIn: '1h' });
      return { admin, token };
    } catch (err) {
      throw err;
    }
  };

  public refreshAdminTokenAction = async (email: string) => {
    try {
      const admin = await this.adminQuery.getAdminByEmail(email);

      if (!admin) throw new httpException(500, 'Admin not found!');

      const payload = {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role_id: admin.role_id,
      };

      const token = sign(payload, String(API_KEY), { expiresIn: '1hr' });

      return { admin, token };
    } catch (err) {
      throw err;
    }
  };
}
