import { User } from "@/components/users/user";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function AppHome() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex  h-screen w-screen flex-col items-start justify-center gap-10 bg-cerulean-900 px-8">
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
