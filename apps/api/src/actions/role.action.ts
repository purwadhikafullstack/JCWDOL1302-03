import { IRole } from '@/interfaces/role.interface';
import { Role } from '@prisma/client';
import { RoleQueries } from '@/queries/role.query';
import { httpException } from '@/exceptions/http.exception';
import { Container, Service } from 'typedi';

@Service()
export class RoleActions {
  roleQuery = Container.get(RoleQueries);

  public createRoleAction = async (data: IRole) => {
    try {
      const role = await this.roleQuery.createRoleQuery(data);

      return role;
    } catch (e) {
      throw e;
    }
  };

  public getRolesAction = async (filters: {
    role?: string;
  }): Promise<IRole[]> => {
    try {
      const role = await this.roleQuery.getRolesQuery(filters);

      return role;
    } catch (e) {
      throw e;
    }
  };

  public updateRoleAction = async (id: number, filters: { role?: string }) => {
    try {
      const role = await this.roleQuery.updateRolesQuery(id, filters);

      return role;
    } catch (e) {
      throw e;
    }
  };

  public deleteRoleAction = async (id: number): Promise<IRole> => {
    try {
      const role = await this.roleQuery.deleteRoleQuery(id);

      return role;
    } catch (e) {
      throw e;
    }
  };
}
