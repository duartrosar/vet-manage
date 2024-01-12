import { User } from "@/components/users/user";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/auth";

export default async function AppHome() {
  const session = await auth();

  return (
    <div className="flex  h-full w-full flex-col items-start justify-center gap-10 bg-cerulean-900 px-8">
      <div className="max-w-xl">{/* <ProfileMenu /> */}</div>
      <div className="space-x-3">
        <LogoutButton />
      </div>
      <div>
        <h2 className="text-2xl text-white">Server Call</h2>
        <div className="text-white">{JSON.stringify(session)}</div>
      </div>
      <div>
        <h2 className="text-2xl text-white">Client Call</h2>
        <User />
      </div>
    </div>
  );
}
