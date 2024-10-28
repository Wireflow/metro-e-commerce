import SiteBanner from '@/components/landing/SiteBanner';
import SignOutButton from '@/features/auth/components/SignOutButton';

export default async function Landing() {
  return (
    <div>
      <SiteBanner />
      <SignOutButton />
    </div>
  );
}
