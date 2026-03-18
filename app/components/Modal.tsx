import { useEffect, useRef } from "react";
import { IconClose } from "~/assets/IconClose";

import "./Modal.css";

export const Modal = ({ isOpen, toggleModal }: { isOpen: boolean, toggleModal: () => void }) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement as HTMLElement;
            closeButtonRef.current?.focus();
        } else {
            previousFocusRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") toggleModal();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, toggleModal]);

    return (
        <div
            className={`Modal ${isOpen ? "Modal--open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            inert={!isOpen}
        >
            <div className="p-8 max-w-[90%] md:max-w-1/2 rounded-md bg-white text-black relative z-10 overflow-visible">
                <button ref={closeButtonRef} onClick={toggleModal} aria-label="Close" className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center bg-white cursor-pointer rounded-full border-black border-2 hover:bg-gray-300"><IconClose size={26} /></button>
                <h2 id="modal-title" className="text-lg font-medium mb-4">Info</h2>

                <p className="mb-4">Write Every Day is a 2026 project started by <a href="https://adamonishi.com">Adam Onishi</a> as a way to help give new and experienced writers a daily prompt or idea of what to write. Whether you need help with idea to kick start your day of writing or just want a daily challenge to help create a daily habit of writing often.</p>

                <p>There is no requirement to submit your writing each day, but if you want to share you can do so via the <a href="https://discord.gg/payEtq7a" target="_blank" rel="noopener noreferrer">Discord server</a> or you could use one of the many writing subreddits.</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/50 cursor-pointer z-0" onClick={toggleModal} aria-hidden="true"></div>
        </div>
    );
};
