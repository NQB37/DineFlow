import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <main className='relative min-h-screen flex items-center justify-center p-4 overflow-hidden'>
      {/* Luxury Background with Blur */}
      <div className='fixed inset-0 z-0'>
        <Image
          src='https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop'
          alt='Luxury Restaurant Background'
          fill
          className='object-cover brightness-[0.2] saturate-[0.8]'
          priority
        />
        <div className='absolute inset-0 bg-black/60 backdrop-blur-[6px]' />
      </div>

      <Card className='relative z-10 w-full max-w-[420px] bg-[#050505]/95 backdrop-blur-2xl border border-gold/30 rounded-none shadow-2xl'>
        <CardHeader className='text-center space-y-2 pt-12 pb-6'>
          <div className='space-y-1 mb-4'>
            <CardTitle className='font-serif italic text-gold text-2xl tracking-[0.4em] uppercase leading-relaxed'>
              DineFlow
            </CardTitle>
            <CardDescription className='text-[9px] uppercase tracking-[0.6em] text-neutral-500 font-bold'>
              Elite Dining Management
            </CardDescription>
          </div>
          <div>
            <h1 className='font-serif text-3xl font-medium text-white tracking-wider'>
              Sign In
            </h1>
            <p className='text-neutral-400 text-sm mt-2 font-light tracking-wide'>
              Welcome back to your portal
            </p>
          </div>
        </CardHeader>

        <CardContent className='px-8 sm:px-10 pb-8'>
          <form className='space-y-5'>
            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold ml-1'
              >
                Member Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='admin@dineflow.com'
                className='h-12 bg-black/50 border border-neutral-800 rounded-none text-white placeholder:text-neutral-700 focus-visible:border-gold focus-visible:ring-0 transition-colors text-sm px-4'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold ml-1'
              >
                Security Key
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                className='h-12 bg-black/50 border border-neutral-800 rounded-none text-white placeholder:text-neutral-700 focus-visible:border-gold focus-visible:ring-0 transition-colors text-sm px-4'
                required
              />
            </div>

            <Button className='w-full h-12 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-black font-bold tracking-[0.2em] uppercase rounded-none border-none hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all mt-8'>
              Access Portal
            </Button>
          </form>

          <div className='relative my-8 flex items-center justify-center'>
            <div className='absolute w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent' />
            <span className='relative bg-[#050505] px-4 text-[10px] text-gold font-bold uppercase tracking-[0.4em]'>
              OR
            </span>
          </div>

          <Button
            variant='outline'
            className='w-full h-12 border border-neutral-800 bg-transparent text-white hover:bg-white/5 hover:text-white rounded-none tracking-[0.15em] uppercase transition-colors flex items-center justify-center text-[11px] font-semibold'
          >
            <svg
              className='h-4 w-4'
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='google'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 488 512'
            >
              <path
                fill='currentColor'
                d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
              ></path>
            </svg>
            Sign in with Google
          </Button>
        </CardContent>

        <CardFooter className='flex flex-col py-6 bg-white/[0.02] border-t border-white/5 rounded-none'>
          <p className='text-[11px] text-neutral-400 tracking-wide font-light'>
            Don&apos;t have a manager account?{' '}
            <Link
              href='/signup'
              className='text-gold hover:text-gold-light hover:underline font-semibold ml-1 tracking-wider transition-colors'
            >
              Register Now
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
