import { Icon } from "@/components/Icon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full pt-[55px] pb-[110px] justify-center w-2/3">
      <Card className="flex p-11 justify-center items-center">
        <CardHeader>
          <Icon name="user" size={60} strokeWidth={1} />
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center">
          <p>
            No user was found for this url. The url may be incorrect, or the
            user may have deleted their account or been suspended.
          </p>
          <Link href="/" className="flex mt-5 font-semibold">
            Return Home
            <span className="ml-4">
              <Icon name="home" className="text-dashboard-primary"/>
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
