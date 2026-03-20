interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  const getColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500";
      case "youtube":
        return "bg-red-600";
      case "website":
        return "bg-blue-600";
      default:
        return "bg-neutral-700";
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 ${getColor(link.platform)}`}
        >
          <span>{link.platform}</span>
          <span className="text-white/70">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
