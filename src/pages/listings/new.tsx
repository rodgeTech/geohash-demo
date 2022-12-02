import { trpc } from "../../utils/trpc";
import type { FormValues } from "./components/Form";
import Form from "./components/Form";
import { useRouter } from "next/router";

export default function NewListing() {
  const router = useRouter();

  const mutation = trpc.listings.create.useMutation();

  const create = (values: FormValues) => {
    console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl">Add your business</h2>
      {mutation.isError && <p className="text-red-500">Failed to save</p>}

      <Form onSubmit={create} />
    </div>
  );
}
