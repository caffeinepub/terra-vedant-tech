import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserProfile } from "../backend";
import { useActor } from "./useActor";

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetPersonalizedDashboard() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string>({
    queryKey: ["personalizedDashboard"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getPersonalizedDashboard();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetUserPreferences() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile>({
    queryKey: ["userPreferences"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getUserPreferences();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useGetVisitCount() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ["visitCount"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getVisitCount();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useIncrementVisitCount() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.incrementVisitCount();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitCount"] });
      queryClient.invalidateQueries({ queryKey: ["personalizedDashboard"] });
    },
  });
}

export function useUpdateUserPreferences() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      displayName,
      preferredContactTopic,
    }: { displayName: string; preferredContactTopic: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateUserPreferences(displayName, preferredContactTopic);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["personalizedDashboard"] });
    },
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userPreferences"] });
    },
  });
}
