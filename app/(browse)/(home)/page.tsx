import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h2>Dashboard</h2>
      <UserButton/>
    </div>
  );
}
