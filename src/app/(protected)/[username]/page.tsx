import { prisma } from "@/lib/prisma";

export default async function UserProfile({
  params,
}: {
  params: { username: string };
}) {
  const user = await prisma.user.findUnique({
    where: { name: params.username }, // Now allowed because `name` is unique
    include: { links: true },
  });

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">{user.name}'s Links</h1>
      <ul>
        {user.links.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank" className="text-blue-500">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
