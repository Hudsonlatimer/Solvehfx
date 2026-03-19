import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Page not found</h1>
      <p className="text-text-secondary mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button variant="primary">Go Home</Button>
        </Link>
        <Link href="/report">
          <Button variant="outline">Report an Issue</Button>
        </Link>
      </div>
    </div>
  );
}
