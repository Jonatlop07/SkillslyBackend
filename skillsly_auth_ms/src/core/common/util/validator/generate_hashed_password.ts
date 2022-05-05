import * as bcrypt from 'bcryptjs';

export default async function generateHashedPassword(password: string): Promise<string> {
  const SALT_ROUNDS = 10;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}
