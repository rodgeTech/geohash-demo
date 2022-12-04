import Link from "next/link";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#e7e7e7]">
      <header className="fixed top-0 z-50 h-20 w-full bg-slate-800 ">
        <div className="mx-auto flex h-full max-w-6xl items-center space-x-16 ">
          <div>
            <Link href="/">
              <h1 className="text-2xl text-white">Local businesses near you</h1>
            </Link>
          </div>
          <div className="grow">
            <div className="flex">
              <input
                type="text"
                placeholder="restaurants, clinics, insurance, barbers"
                className="w-full rounded-l-md border p-2"
              />
              <button className="rounded-r-md bg-slate-600 px-4 text-white">
                Go
              </button>
            </div>
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
