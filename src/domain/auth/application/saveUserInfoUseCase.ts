import { SaveUserInfoRequest, User } from "../domain/entities";
import { AuthRepository } from "../domain/repositories";

function saveUserInfoUseCase(authRepository: AuthRepository) {
  return async function (request: SaveUserInfoRequest): Promise<User> {
    try {
      return await authRepository.saveUserInfo(request);
    } catch (err) {
      console.error(err);
      throw new Error("Error saving user info");
    }
  };
}

export default saveUserInfoUseCase;
