"use client";

import { useForm } from "react-hook-form";
import { editEvent } from "@/actions/events";

type FormValues = {
  title: string;
  description: string;
  eventDate: string;
};

type Props = {
  eventId: string;
  defaultValues: FormValues;
};

export default function EditEventForm({ eventId, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    await editEvent({
      eventId,
      ...data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-md w-full p-8 border border-gray-300 bg-white shadow-lg rounded-xl"
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Description</label>
        <textarea
          {...register("description")}
          className="rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-600">Event Date</label>
        <input
          type="date"
          {...register("eventDate", { required: true })}
          className="rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onFocus={(e) => e.currentTarget.showPicker?.()}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
      >
        Save Changes
      </button>
    </form>
  );
}
