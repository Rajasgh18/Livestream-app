import { UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/results";

export default function Home() {
  return (
    <div className="h-full max-w-screen-2xl p-8 mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
