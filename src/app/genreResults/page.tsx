import { Suspense } from "react";
import GenreResultsPage from "./psda";
export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Уншиж байна...</div>}>
      <GenreResultsPage />
    </Suspense>
  );
}
