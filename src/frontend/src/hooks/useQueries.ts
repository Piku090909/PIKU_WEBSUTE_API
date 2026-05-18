import { createActor } from "@/backend";
import type { SiteData, SocialLink } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type { SiteData, SocialLink };

const DEFAULT_SITE_DATA: SiteData = {
  bio: "Connect with me across the digital universe.",
  contactEmail: "mralexpiku@gmail.com",
  links: [
    {
      id: "whatsapp",
      title: "WhatsApp",
      href: "https://api.whatsapp.com/send?phone=+918536881026&text=\u279a\ud835\udc07\ud835\udc04\ud835\udc0b\ud835\udc0b\ud835\udc0e_\u0394\u039b\u039e\u03a7_\u03a1\u0399\u039a\u03a5\ud83c\udf1a\ud83d\udc97",
      description: "Chat with me directly on WhatsApp for quick conversations.",
      cta: "Connect",
    },
    {
      id: "instagram",
      title: "Instagram",
      href: "https://www.instagram.com/alexpiku_badmash?igsh=MXF1ZXIxa283bGI2bg==",
      description: "Follow my journey and daily moments on Instagram.",
      cta: "Follow",
    },
    {
      id: "facebook",
      title: "Facebook",
      href: "https://www.facebook.com/share/1B2juoWzCE/",
      description:
        "Connect with me on Facebook and stay updated with my posts.",
      cta: "Connect",
    },
    {
      id: "vk",
      title: "VK",
      href: "https://vk.ru/club236355393",
      description: "Join my VK community for exclusive content and updates.",
      cta: "Join",
    },
  ],
};

export function useSiteData() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SiteData>({
    queryKey: ["siteData"],
    queryFn: async () => {
      if (!actor) return DEFAULT_SITE_DATA;
      const data = await actor.getSiteData();
      // If bio is empty, use default
      if (!data.bio && data.links.length === 0) return DEFAULT_SITE_DATA;
      return data;
    },
    enabled: !!actor && !isFetching,
    placeholderData: DEFAULT_SITE_DATA,
  });
}

export function useIsOwner() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["isOwner"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isOwner();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClaimOwnership() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.claimOwnership();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isOwner"] });
    },
  });
}

export function useSetSiteData() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SiteData) => {
      if (!actor) throw new Error("Not connected");
      return actor.setSiteData(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteData"] });
    },
  });
}
