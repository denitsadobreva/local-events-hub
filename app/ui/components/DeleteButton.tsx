"use client";

import { useState } from "react";
import { deleteEvent } from "../../events/actions";

export default function DeleteButton({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Delete Event
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this event?
            </h2>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <form action={deleteEvent}>
                <input type="hidden" name="eventId" value={eventId} />
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
