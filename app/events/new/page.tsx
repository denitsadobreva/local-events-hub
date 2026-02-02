"use client";

import { addNewEvent } from "@/actions/events";
import { Button, Input, Textarea } from "@/components/form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const result = await addNewEvent(formData);

    if (result.ok) {
      toast.success(result.message);
      router.push("/events");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-6 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-800">Add New Event</h1>

      <form
        action={handleSubmit}
        className="flex flex-col gap-6 max-w-md w-full p-8 border border-gray-300 bg-white shadow-lg rounded-xl"
      >
        <Input label="Title:" name="title" type="text" id="title" required />

        <Textarea
          label="Description:"
          name="description"
          id="description"
          required
        />

        <Input
          label="Event Date:"
          name="eventDate"
          type="date"
          id="eventDate"
          required
          className="cursor-pointer"
        />

        <Button type="submit" variant="primary">
          Add Event
        </Button>
      </form>
    </div>
  );
}
