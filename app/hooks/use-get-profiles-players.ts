import { ENDPOINTS } from "@/constants/end-points";
import { sportsinApi } from "@/lib/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "./use-post-profiles-players";

const useGetProfilesPlayers = () => {
  return useQuery({
    queryKey: ["profiles-players"],
    queryFn: () => sportsinApi.get<Profile>(ENDPOINTS.v1.profiles.players),
  });
};

export default useGetProfilesPlayers;
