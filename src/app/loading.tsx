import { Icon } from "@/components/Icon";

export default function Loading() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Icon name="loader-circle" className="animate-spin" size={45} />
    </div>
  );
}
