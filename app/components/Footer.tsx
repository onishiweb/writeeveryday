import { IconDiscord } from "~/assets/IconDiscord"
import { IconInfo } from "~/assets/IconInfo"

export const Footer = ({ toggleModal }: { toggleModal: () => void }) => {
  return (
    <footer className="p-4">
      <ul className="flex flex-row gap-4 justify-center">  
        <li>
          <a href="https://discord.gg/payEtq7a" target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2 items-center"><IconDiscord size={20} /> Discord</a>
        </li>
        <li><button onClick={toggleModal} className="flex flex-row gap-2 items-center text-current cursor-pointer"><IconInfo size={20} /> Info</button></li>
      </ul>
    </footer>
  )
}