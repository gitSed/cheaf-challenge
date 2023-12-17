import { SaveUserInfoRequest, User } from "../entities";

interface AuthRepository {
  saveUserInfo(request: SaveUserInfoRequest): Promise<User>;
}

export default AuthRepository;
