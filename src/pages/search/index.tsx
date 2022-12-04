import { type NextPage } from "next";
import { useRouter } from "next/router";
import Empty from "../../components/Empty";
import ListingPreview from "../../components/ListingPreview";
import Map from "../../components/Map";
import { useCurrentLocation } from "../../hooks/useCurrenLocation";

import { trpc } from "../../utils/trpc";

const Search: NextPage = () => {
  const { query } = useRouter();
  const { location } = useCurrentLocation();

  const { data: nearByListings, isLoading: nearByIsLoading } =
    trpc.search.nearBy.useQuery(
      { ...location!, search: query.text as string },
      { enabled: !!location }
    );

  return (
    <div>
      {nearByIsLoading && <p>Loading nearby businesses...</p>}

      <div className="flex ">
        <div className="mt-32 flex flex-1">
          {nearByListings && (
            <ul className="grid grid-cols-3 gap-8 py-4 px-8">
              {nearByListings.map((listing) => (
                <ListingPreview listing={listing} key={listing.id} />
              ))}
            </ul>
          )}
          {!nearByIsLoading && !nearByListings?.length && <Empty />}
        </div>
        {location && (
          <div className="w-2/6">
            <div className="fixed right-0 top-20 h-full w-2/6 border-l bg-white">
              <Map coords={location} listings={nearByListings} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
