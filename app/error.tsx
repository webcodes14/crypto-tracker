'use client'

import { TbFaceIdError } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    const router = useRouter();

    const handleTryAgain = () => {
        reset();
        router.refresh();
    }

    return (
    <div className="text-center my-12">
        <TbFaceIdError className="w-full h-16" />
        <h2>Něco se pokazilo!</h2>
        <button type="button" className="border border-solid border-neutral-800 px-4 py-2 m-2 cursor-pointer hover:bg-neutral-800 transition-colors duration-300 ease-linear hover:text-white" onClick={handleTryAgain}>Zkusit znovu</button>
    </div>
  )
}