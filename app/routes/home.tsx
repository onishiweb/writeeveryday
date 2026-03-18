import type { Route } from "./+types/home";
import { useState } from "react";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { prompts } from "../utils/prompts";
import { Navigation } from "../components/Navigation/Navigation";
import { redirect } from "react-router";
import { getCurrentDayOfYear } from "../utils/currentDayOfYear";
import { Prompt } from "~/components/Prompt";

export async function loader() {
  const currentDay = getCurrentDayOfYear();
  if (currentDay > prompts.length) {
    return redirect(`/day/${prompts.length}`);
  }
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDay = getCurrentDayOfYear();
  const prompt = currentDay > prompts.length ? prompts[prompts.length - 1] : prompts[currentDay - 1];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return <div className="flex flex-col h-svh">
    <Menu />
    <main className="relative p-10 flex-1 flex flex-col justify-center items-center">
      <Prompt dayNumber={currentDay} prompt={prompt} />
      <Navigation currentDay={currentDay} totalPrompts={prompts.length} currentDayOfYear={currentDay} />
    </main>

    <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
    <Footer toggleModal={toggleModal} />
  </div>;
}
