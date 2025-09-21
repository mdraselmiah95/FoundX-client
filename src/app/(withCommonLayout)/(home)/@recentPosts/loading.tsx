import { Button } from "@nextui-org/button";
import Link from "next/link";

import Container from "@/src/components/UI/Container";
import CardSkeleton from "@/src/components/UI/CardSkeleton";

export default function Loading() {
  return (
    <Container>
      <div className="my-8 section-title">
        <h2 className="mb-2 text-2xl text-center">Recently Found Items</h2>
        <p className="text-center">
          A list of items that have been recently found and reported.
        </p>
      </div>
      <div className="grid justify-center gap-10 my-8 sm:grid-cols-1 md:grid-cols-3">
        {[...Array(9)].map(() => (
          <CardSkeleton />
        ))}
      </div>
      <div className="flex justify-center">
        <Button className="rounded-md bg-default-900 text-default" size="md">
          <Link href="/found-items">See All</Link>
        </Button>
      </div>
    </Container>
  );
}
