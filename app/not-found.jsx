import Link from "next/link";
import { Button } from "@/components/ui/button"; // Optional: Use your UI component if available

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-background transition-colors duration-300">
      {/* text-foreground automatically switches between black and white */}
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      
      {/* text-muted-foreground handles the secondary gray text */}
      <p className="mt-4 text-muted-foreground">Oops! Page not found.</p>
      
      <Link href="/">
        <div className="mt-6 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors">
          Go Home
        </div>
      </Link>
    </div>
  );
}