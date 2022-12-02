import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [coords, setCoords] = useState<{ lat: number; long: number }>();

  const results = trpc.search.nearBy.useQuery(coords!, { enabled: !!coords });

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        if (location) {
          console.log(location.coords);
          setCoords({
            lat: location.coords.latitude,
            long: location.coords.longitude,
          });
        }
      });
    }
  }, []);

  return (
    <div>
      <ul className="grid grid-cols-3 gap-10">
        <li className="rounded-md border bg-white p-3">
          <h3 className="text-xl">People store</h3>
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
        </li>
        <li>
          <h3 className="text-xl">Eve&apos;s clinic</h3>
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
        </li>
        <li>
          <h3 className="text-xl">Cocina sabor</h3>
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
        </li>
        <li>
          <h3 className="text-xl">Dibary</h3>
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
        </li>
        <li>
          <h3 className="text-xl">Medical Plaza</h3>
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
        </li>
        <li>
          <h3 className="text-xl">Mikado clothing center</h3>
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
