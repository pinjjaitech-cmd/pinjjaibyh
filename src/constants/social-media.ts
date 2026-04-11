export const SOCIAL_MEDIA_LINKS = {
  facebook: "https://www.facebook.com/share/1ELqfMvtR3/",
  instagram: "https://www.instagram.com/pinjjai_by_h?igsh=aWtyd2E5Ymhqc2Zj",
  linkedin: "https://www.linkedin.com/company/pinjjai-by-h/",
} as const;

export const SOCIAL_MEDIA_CONFIG = [
  {
    name: "Facebook",
    href: SOCIAL_MEDIA_LINKS.facebook,
    icon: "Facebook",
  },
  {
    name: "Instagram", 
    href: SOCIAL_MEDIA_LINKS.instagram,
    icon: "Instagram",
  },
  {
    name: "LinkedIn",
    href: SOCIAL_MEDIA_LINKS.linkedin,
    icon: "Linkedin",
  },
] as const;
