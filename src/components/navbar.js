import { Button } from "antd";
import logo from "../assets/AarcLogo.png"
import { useDisconnect, useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SelectChain from "./selectChain";

export default function Navbar() {

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-[#EEFFB9] px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <img onClick={() => { window.location.reload() }} className="w-18 h-9 scale-150 cursor-pointer" src={logo}></img>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">

                <div className="flex items-center gap-x-4 lg:gap-x-6">

                </div>
            </div>
        </div>
    )
}



