import type { Route } from "./+types/home";
import { useState } from "react";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { IconArrow } from "../assets/IconArrow";

import "./home.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Write Every Day | A daily writing exercise for writers" },
    { name: "description", content: "Write every day is a daily writing exercise for writers aspiring to write on a regular basis. Whether you're a beginner or an experienced writer, write every day is a great way to get started or stay motivated." },
    { name: "apple-mobile-web-app-title", content: "Write Daily" },
  ];
}

export function links({}: Route.LinksFunction) {
  return [
    { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ];
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prompt = "Write about someone celebrating something new in their life.";

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return <div className="flex flex-col h-screen">
    <Menu />
    <div className="relative p-10 flex-1 flex flex-col justify-center items-center">
      <h1 className="text-lg font-normal mb-4">Day 1</h1>
      <p className="text-2xl md:text-4xl font-medium tracking-wide text-center max-w-[260px] md:max-w-xl">
        {prompt}
      </p>
      

      <button className="navigation-button navigation-button--left" disabled>
        <IconArrow size={32} className="rotate-180" />
      </button>
      
      <button className="navigation-button navigation-button--right" disabled>
        <IconArrow size={32} />
      </button>      
    </div>

    <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
    <Footer toggleModal={toggleModal} />
  </div>;
}
