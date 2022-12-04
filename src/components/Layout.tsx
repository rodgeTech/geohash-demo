import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Open_Sans } from "@next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  const initialSearchText = router.query.text as string;

  useEffect(() => {
    setSearchText(initialSearchText);
  }, [initialSearchText]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#ffffff] to-[#e7e7e7] ${openSans.className}`}
    >
      <header className="fixed top-0 z-50 h-20 w-full bg-slate-800 ">
        <div className="mx-auto flex h-full max-w-6xl items-center space-x-16 ">
          <div>
            <Link href="/">
              <h1 className="text-2xl text-white">Local businesses near you</h1>
            </Link>
          </div>
          <div className="grow">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push({
                  pathname: "/search",
                  query: { text: searchText },
                });
              }}
            >
              <div className="flex">
                <input
                  value={searchText}
                  name="search"
                  type="text"
                  placeholder="restaurants, clinics, insurance, barbers"
                  className="w-full rounded-l-md border p-2"
                  onChange={(event) => setSearchText(event.target.value)}
                />
                <button
                  className="rounded-r-md bg-slate-600 px-4 text-white"
                  type="submit"
                >
                  Go
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center space-x-3">
            <h3 className=" text-white">Looking for this?</h3>
            <Link
              href="/listings/new"
              className="rounded-md border border-slate-800 bg-white py-2 px-6 text-slate-800"
            >
              Add your business
            </Link>
          </div>
        </div>
      </header>
      <main className="">{children}</main>
    </div>
  );
}
