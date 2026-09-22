"use client";

import React from "react";

interface ConfirmDeleteModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  open,
  title = "ยืนยันการลบ",
  message = "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
  confirmText = "ยืนยันลบ",
  cancelText = "ยกเลิก",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => {
        if (!loading) {
          onCancel();
        }
      }}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-3 text-gray-600">
          {message}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">

          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex min-w-[100px] items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                กำลังลบ...
              </>
            ) : (
              confirmText
            )}
          </button>

        </div>
      </div>
    </div>
  );
}