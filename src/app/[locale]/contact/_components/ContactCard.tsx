import { Link } from "lucide-react";

export const ContactCard = ({
  icon,
  title,
  href,
  target = "_self",
}: {
  icon: React.ReactNode;
  title: string;
  href?: string;
  target?: string;
}) => {
  const content = (
    <div className="flex flex-col justify-center items-center min-w-xs p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full border border-gray-100 font-noto-sans text-deep-blue-gray cursor-pointer">
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className="block h-full"
        aria-label={title}
      >
        {content}
      </Link>
    );
  }

  return content;
};
