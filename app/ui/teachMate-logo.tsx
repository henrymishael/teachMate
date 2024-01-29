import { lusitana } from "@/app/ui/fonts";
import logo from "../../public/logo2.png";
import Image from "next/image";

export default function TeachMateLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <Image src={logo} alt='Teach Mate Logo' height={80} /> */}
      <p className='text-[32px]'>TeachMateAI</p>
    </div>
  );
}
