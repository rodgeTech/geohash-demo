import type { Listing } from "@prisma/client";
import Link from "next/link";

type Props = {
  listing: Listing;
};
export default function ListingPreview({ listing }: Props) {
  return (
    <li className="rounded-md  bg-white p-3" key={listing.id}>
      <h3 className="text-xl font-bold tracking-tight text-slate-800">
        {listing.name}
      </h3>
      <p className="mb-2 text-sm">{listing.address}</p>
      <p className="text-slate-600">{listing.details}</p>
      <Link href={`/listings/${listing.id}`} className="text-sm">
        Edit
      </Link>
    </li>
  );
}
