import * as bcrypt from 'bcryptjs';
import { bizCode } from '~/biz.code';

export interface HttpReturnType<T = any> {
  data?: T;
  statusCode?: keyof typeof bizCode;
}

export const HttpReturn = <T>(payload: HttpReturnType<T>) => {
  const { statusCode = 1, data = null } = payload;
  return {
    data,
    statusCode,
    message: bizCode[statusCode],
  };
};

/**
 * generatePassword
 * @param password
 */
export const generatePassword = async (password: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

/**
 * comparePassword
 * @param password
 * @param hash
 */
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
