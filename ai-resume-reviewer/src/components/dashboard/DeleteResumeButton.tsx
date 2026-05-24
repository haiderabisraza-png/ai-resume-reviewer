"use client";

import { useState } from "react";
import { deleteResume } from "@/actions/resume.actions";
import { toast } from "sonner";

export default function DeleteResumeButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000);
      return;
    }
    setLoading(true);
    const result = await deleteResume(id);
    if (result.success) {
      toast.success("Resume deleted");
    } else {
      toast.error(result.error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
        confirm
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "text-surface-400 hover:text-red-500 hover:bg-red-50"
      } disabled:opacity-50`}
    >
      {loading ? "Deleting..." : confirm ? "Confirm?" : "Delete"}
    </button>
  );
}
