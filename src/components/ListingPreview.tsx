import type { Listing } from "@prisma/client";
import Link from "next/link";

type Props = {
  listing: Listing;
};
export default function ListingPreview({ listing }: Props) {
  return (
    <li className="rounded-md border bg-white p-3" key={listing.id}>
      <div>
        <h3 className="text-xl font-bold leading-6 tracking-tight text-slate-800">
          {listing.name}
        </h3>
        <p className="my-2 text-sm">{listing.address}</p>
      </div>

      <p className="text-slate-600">{listing.details}</p>
      <Link href={`/listings/${listing.id}`} className="text-sm">
        Edit
      </Link>
    </li>
  );
}
