import { Suspense } from "react";
import { AllResultsPage } from "./paged";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-[100px] text-xl">Loading results...</div>}>
      <AllResultsPage />
    </Suspense>
  );
}
