import { lusitana } from "./ui/fonts";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Local Events Hub</h1>
      <p className={`${lusitana.className} antialiased`}>
        This is the hub for local events.
      </p>
    </div>
  );
}
