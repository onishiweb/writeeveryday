import type { Route } from "./+types/home";
import { useState } from "react";
import { redirect, useParams } from "react-router";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { Prompt } from "../components/Prompt";
import { prompts } from "../utils/prompts";
import { Navigation } from "../components/Navigation/Navigation";
import { getCurrentDayOfYear } from "~/utils/currentDayOfYear";

export async function loader({ request }: { request: Request }) {
  const dayNumber = new URL(request.url).pathname.split("/").pop();
  const day = Number(dayNumber);

  if (day > prompts.length || day < 1 || Number.isNaN(day)) {
    return redirect("/");
  }

  const currentDay = getCurrentDayOfYear();
  if (day > currentDay) {
    return redirect(`/day/${currentDay}`);
  }
}

export default function Day() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dayNumber } = useParams();
  const day = Number(dayNumber);
  const currentDay = getCurrentDayOfYear();
  const prompt = prompts[day - 1];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return <div className="flex flex-col h-svh">
    <Menu />
    <main className="relative p-10 flex-1 flex flex-col justify-center items-center">
      <Prompt dayNumber={day} prompt={prompt} />
      <Navigation currentDay={day} totalPrompts={prompts.length} currentDayOfYear={currentDay} />
    </main>

    <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
    <Footer toggleModal={toggleModal} />
  </div>;
}
