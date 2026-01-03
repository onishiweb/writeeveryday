import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { prompts } from "../utils/prompts";
import { Navigation } from "../components/Navigation/Navigation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Write Every Day | A daily writing exercise for writers" },
    { name: "description", content: "Write every day is a daily writing exercise for writers aspiring to write on a regular basis. Whether you're a beginner or an experienced writer, write every day is a great way to get started or stay motivated." },
    { name: "apple-mobile-web-app-title", content: "Write Daily" },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export async function loader({ request }: { request: Request }) {
  const dayNumber = new URL(request.url).pathname.split("/").pop();
  
  if (Number(dayNumber) > prompts.length || Number(dayNumber) < 1) {
    return redirect("/");
  }
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dayNumber } = useParams();
  const prompt = Number(dayNumber) > prompts.length ? prompts[prompts.length - 1] : prompts[Number(dayNumber) - 1];
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    if (Number(dayNumber) > prompts.length) {
      navigate(`/day/${prompts.length}`);
    }
  }, [dayNumber, navigate]);

  return <div className="flex flex-col h-lvh">
    <Menu />
    <div className="relative p-10 flex-1 flex flex-col justify-center items-center">
      <h1 className="text-lg font-normal -mt-4 mb-4">Day {dayNumber}</h1>
      
      <p className="text-2xl md:text-4xl font-medium tracking-wide text-center max-w-[260px] md:max-w-xl">
        {prompt}
      </p>

      <Navigation currentDay={Number(dayNumber)} totalPrompts={prompts.length} />
    </div>

    <Modal isOpen={isModalOpen} toggleModal={toggleModal} />
    <Footer toggleModal={toggleModal} />
  </div>;
}
