import { FilterUser } from '@/interfaces/user.interface';
import instance from '@/utils/instances';

export const getAllUser = async ({
  email = '',
  page = 1,
  pageSize = 10,
}: FilterUser) => {
  try {
    const { data } = await instance.get(
      `/user?email=${email}&page=${page}&pageSize=${pageSize}`,
    );
    const users = data.data;

    return users;
  } catch (err) {
    console.log(err);
  }
};
