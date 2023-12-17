import { AuthFetcher } from "@/domain/auth/domain/fetchers";
import { AuthRepository } from "@/domain/auth/domain/repositories";

export interface LoginContainerProps {
  repository: AuthRepository;
  fetcher: AuthFetcher;
}
