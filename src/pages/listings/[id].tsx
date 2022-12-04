import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import type { FormValues } from "./components/Form";
import Form from "./components/Form";

export default function Listing() {
  const router = useRouter();

  const { id } = router.query;

  const mutation = trpc.listings.update.useMutation();

  const { data } = trpc.listings.getOne.useQuery({ id: id as string });

  const update = (values: FormValues) => {
    mutation.mutate(
      { id: id as string, data: values },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  return (
    <div className="mx-auto my-40 max-w-4xl">
      <h2 className="mb-4 text-2xl">Edit listing</h2>

      {mutation.isError && <p className="text-red-500">Failed to save</p>}

      {data && (
        <Form
          onSubmit={update}
          initialValues={{
            address: data.address,
            details: data.details,
            latitude: data.latitude.toString(),
            longitude: data.longitude.toString(),
            name: data.name,
          }}
        />
      )}
    </div>
  );
}
