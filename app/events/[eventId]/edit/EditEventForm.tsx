"use client";

import { useForm } from "react-hook-form";
import { editEvent } from "@/actions/events";
import { Button, Input, Textarea } from "@/components/form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    const result = await editEvent({
      eventId,
      ...data,
    });

    if (result.ok) {
      toast.success(result.message);
      router.push(`/events/${eventId}`);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-md w-full p-8 border border-gray-300 bg-white shadow-lg rounded-xl"
    >
      <Input
        label="Title"
        {...register("title", { required: "Title is required" })}
        className="rounded-md px-3 py-1.5 outline-1 outline-gray-300 text-gray-900 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </Input>

      <Textarea
        label="Description"
        {...register("description", { required: true })}
      />

      <Input
        label="Event Date"
        type="date"
        {...register("eventDate", { required: true })}
        className="cursor-pointer"
      />

      <Button type="submit" disabled={isSubmitting} variant="confirm">
        Save Changes
      </Button>
    </form>
  );
}
