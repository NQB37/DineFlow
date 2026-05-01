import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 py-12 overflow-hidden">
      {/* Luxury Background with Blur */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Restaurant Background"
          fill
          className="object-cover brightness-[0.2] saturate-[0.8]"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px]" />
      </div>

      <Card className="relative z-10 w-full max-w-[480px] bg-[#050505]/95 backdrop-blur-2xl border border-gold/30 rounded-none shadow-2xl">
        <CardHeader className="text-center space-y-2 pt-12 pb-6">
          <div className="space-y-1 mb-4">
            <CardTitle className="font-serif italic text-gold text-2xl tracking-[0.4em] uppercase leading-relaxed">
              DineFlow
            </CardTitle>
            <CardDescription className="text-[9px] uppercase tracking-[0.6em] text-neutral-500 font-bold">
              Elite Dining Management
            </CardDescription>
          </div>
          <div>
            <h1 className="font-serif text-3xl font-medium text-white tracking-wider">Create Account</h1>
            <p className="text-neutral-400 text-sm mt-2 font-light tracking-wide">Join the exclusive DineFlow network</p>
          </div>
        </CardHeader>

        <CardContent className="px-8 sm:px-12 pb-8">
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold ml-1">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="h-12 bg-black/50 border border-neutral-800 rounded-none text-white placeholder:text-neutral-700 focus-visible:border-gold focus-visible:ring-0 transition-colors text-sm px-4"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold ml-1">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="h-12 bg-black/50 border border-neutral-800 rounded-none text-white placeholder:text-neutral-700 focus-visible:border-gold focus-visible:ring-0 transition-colors text-sm px-4"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold ml-1">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                className="h-12 bg-black/50 border border-neutral-800 rounded-none text-white placeholder:text-neutral-700 focus-visible:border-gold focus-visible:ring-0 transition-colors text-sm px-4"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold ml-1">
                Create Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 bg-black/50 border border-neutral-800 rounded-none text-white placeholder:text-neutral-700 focus-visible:border-gold focus-visible:ring-0 transition-colors text-sm px-4"
                required
              />
            </div>

            <Button className="w-full h-12 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-black font-bold tracking-[0.2em] uppercase rounded-none border-none hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all mt-8">
              Register Now
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col py-6 bg-white/[0.02] border-t border-white/5 rounded-none">
          <p className="text-[11px] text-neutral-400 tracking-wide font-light">
            Already have an account?{" "}
            <Link href="/login" className="text-gold hover:text-gold-light hover:underline font-semibold ml-1 tracking-wider transition-colors">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}