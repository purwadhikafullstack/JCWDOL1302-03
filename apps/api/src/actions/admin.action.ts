import { AdminQueries } from '@/queries/admin.query';
import { Container, Service } from 'typedi';
import {
  IAdmin,
  IFilterAdmin,
  ResultAdmin,
} from '@/interfaces/admin.interface';
import { Admin } from '@prisma/client';

@Service()
export class AdminActions {
  adminQuery = Container.get(AdminQueries);

  public getAdminByIDAction = async (id: number) => {
    try {
      const admin = await this.adminQuery.getAdminByIDQuery(id);
      return admin;
    } catch (e) {
      throw e;
    }
  };

  public getAllAdminAction = async (
    filters: IFilterAdmin,
  ): Promise<ResultAdmin> => {
    try {
      const data = await this.adminQuery.getAllAdminQuery(filters);
      return data;
    } catch (e) {
      throw e;
    }
  };

  public createAdminAction = async (adminData: IAdmin): Promise<Admin> => {
    try {
      const existAdmin = await this.adminQuery.getAdminByEmail(adminData.email);

      if (existAdmin) throw new Error('Email already exist');

      const newAdmin = await this.adminQuery.createAdminQuery(adminData);

      return newAdmin;
    } catch (err) {
      throw err;
    }
  };

  public updateAdminAction = async (
    id: number,
    adminData: IAdmin,
  ): Promise<Admin> => {
    try {
      const admin = await this.adminQuery.updateAdminQuery(id, adminData);

      return admin;
    } catch (e) {
      throw e;
    }
  };

  public deleteAdminAction = async (id: number): Promise<IAdmin> => {
    try {
      const admin = await this.adminQuery.deleteAdminQuery(id);
      return admin;
    } catch (e) {
      throw e;
    }
  };
}
