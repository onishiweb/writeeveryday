import { IconClose } from "~/assets/IconClose";

import "./Modal.css";

export const Modal = ({ isOpen, toggleModal }: { isOpen: boolean, toggleModal: () => void }) => {
    return (
        <div className={`Modal ${isOpen ? "Modal--open" : ""}`}>
            <div className="p-8 max-w-[90%] md:max-w-1/2 rounded-md bg-white text-black relative z-10 overflow-visible">
                <button onClick={toggleModal} className="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center bg-white cursor-pointer rounded-full border-black border-2 hover:bg-gray-300"><IconClose size={26} /></button>
                <h2 className="text-lg font-medium mb-4">Info</h2>

                <p className="mb-4">Write Every Day is a 2026 project started by <a href="https://adamonishi.com">Adam Onishi</a> as a way to help give new and experienced writers a daily prompt or idea of what to write. Whether you need help with idea to kick start your day of writing or just want a daily challenge to help create a daily habit of writing often.</p>

                <p>There is no requirement to submit your writing each day, but if you want to share you can do so via the <a href="https://discord.gg/payEtq7a" target="_blank">Discord server</a> or you could use one of the many writing subreddits.</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/50 cursor-pointer z-0" onClick={toggleModal}></div>
        </div>
    );
};