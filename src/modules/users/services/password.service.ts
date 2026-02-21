import bcrypt from "bcrypt";

export default class PasswordService {

  async encrypt(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}