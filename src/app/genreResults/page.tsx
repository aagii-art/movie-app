import { Suspense } from "react";
import GenreResultsPage from "./aa/page";
export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Уншиж байна...</div>}>
      <GenreResultsPage />
    </Suspense>
  );
}
