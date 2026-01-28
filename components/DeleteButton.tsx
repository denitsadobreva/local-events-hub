"use client";

import { useState } from "react";
import { deleteEvent } from "@/actions/events";
import { Button } from "@/components/form";

export default function DeleteButton({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="danger">
        Delete Event
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full  border-gray-300 bg-white shadow-lg rounded-xl">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this event?
            </h2>

            <div className="flex justify-end gap-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>

              <form action={deleteEvent}>
                <input type="hidden" name="eventId" value={eventId} />
                <Button type="submit" variant="danger">
                  Delete
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
