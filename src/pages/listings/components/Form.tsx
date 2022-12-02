import React from "react";
import { useForm } from "react-hook-form";

export type FormValues = {
  name: string;
  address: string;
  details: string;
  latitude: string;
  longitude: string;
};

type Props = {
  onSubmit: (data: FormValues) => void;
};

const Form = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="name"
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: true })}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="address"
        >
          Address
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="address"
          type="text"
          placeholder="Enter your address"
          {...register("address", { required: true })}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="address"
        >
          Latitude
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="latitude"
          type="number"
          step="any"
          placeholder="Enter your latitude"
          {...register("latitude", { required: true })}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="address"
        >
          Longitude
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="longitude"
          type="number"
          step="any"
          placeholder="Enter your longitude"
          {...register("longitude", { required: true })}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="details"
        >
          Details
        </label>
        <textarea
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="details"
          placeholder="Enter your details"
          {...register("details")}
        />
      </div>
      <button
        className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        type="submit"
      >
        Submit listing
      </button>
    </form>
  );
};

export default Form;
