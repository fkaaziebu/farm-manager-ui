"use client";

import { useModal } from "@/hooks/use-modal-store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export const NotificationModal = () => {
  const { isOpen, onClose, data, type } = useModal();
  const { notificationType, notificationMessage } = data || {};

  const isModalOpen = isOpen && type === "notification";

  useEffect(() => {
    const notificationTimeOut = setTimeout(() => {
      if (isModalOpen) {
        onClose();
      }
    }, 6000);

    return () => clearTimeout(notificationTimeOut);
  }, [isModalOpen, onClose]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ x: 100, opacity: 0, display: "none" }}
          animate={{ x: 0, opacity: 1, display: "block" }}
          exit={{ x: 100, opacity: 0, display: "none" }}
          className="fixed top-6 right-6 z-50 w-[300px]"
        >
          <div
            className={`
              flex items-start gap-4 p-4 rounded-lg shadow-lg
              ${
                notificationType === "success"
                  ? "bg-green-50 border border-green-400"
                  : notificationType === "error"
                    ? "bg-red-50 border border-red-400"
                    : "bg-yellow-50 border border-yellow-400"
              }
            `}
          >
            {/* Icon */}
            <div className="mt-1">
              {notificationType === "success" && (
                <CheckCircle className="text-green-600 w-6 h-6" />
              )}
              {notificationType === "error" && (
                <AlertCircle className="text-red-600 w-6 h-6" />
              )}
            </div>

            {/* Message */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">
                {notificationMessage}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
