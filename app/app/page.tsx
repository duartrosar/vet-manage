import { auth } from "@/auth";
import AppointmentForm from "@/components/forms/appointment/appointment-form";
import TimeRangePicker from "@/components/time-picker/time-range-picker";
import { getPets } from "@/lib/db/actions/pet-actions";
import { getVets } from "@/lib/db/actions/vet-actions";

export default async function AppHome() {
  return (
    <div className="gap-10px-8  flex h-full w-full flex-col items-start justify-center">
      {/* <div className="space-x-3">
        <LogoutButton />
      </div>
      <div>
        <h2 className="text-2xl text-white">Server Call</h2>
        <div className="text-white">{JSON.stringify(session)}</div>
      </div>
      <div>
        <h2 className="text-2xl text-white">Client Call</h2>
        <User />
      </div> */}
      <h2 className="text-2xl text-cerulean-800 dark:text-white">
        Client Call
      </h2>
      <div className="w-60 space-y-3"></div>
    </div>
  );
}
