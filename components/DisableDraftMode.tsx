"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const DisableDraftMode = () => {
  const environment = useDraftModeEnvironment();
  const router = useRouter();
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }
  const handleClicked = async () => {
    await fetch("/draftmode/disable");
    router.refresh();
  };
  return (
    <Button
      onClick={handleClicked}
      className="hoverEffect fixed bottom-4 z-50 border border-gray-500 bg-gray-50 px-4 py-2 text-black ring-4 hover:text-white"
    >
      Disable Draft Mode
    </Button>
  );
};
export default DisableDraftMode;
