"use client"

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Modal({ isOpen, onClose, title, buttonClose = true, className, children }) {

  const handleClose = () => {
    onClose(false);
  };

  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        onClose(false);
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, []);

  return (
    <dialog className="flex flex-wrap justify-center items-center w-full h-full fixed bg-black/50 top-0 bottom-0 left-0 right-0 z-10" >
      <div className={cn("bg-white p-4 border rounded-md min-w-80 min-h-40 overflow-y-auto", className)}>
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button title="Fechar" onClick={handleClose}>
            {buttonClose && (
              <X className="text-slate-500 hover:text-black" width={"22px"} />
            )}
          </button>
        </div>
        <div className="mt-2 w-full">
          {children}
        </div>
      </div>
    </dialog>
  )
}
