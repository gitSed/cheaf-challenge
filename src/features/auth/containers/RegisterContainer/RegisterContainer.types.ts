import { AuthFetcher } from "@/domain/auth/domain/fetchers";
import { AuthRepository } from "@/domain/auth/domain/repositories";

export interface RegisterContainerProps {
  repository: AuthRepository;
  fetcher: AuthFetcher;
}
