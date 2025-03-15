import Link from 'next/link'

export const UpgradePlanBanner = () => (
  <div className="fixed flex items-center justify-center w-full h-[44px] font-bold text-sm text-deep-blue-gray bg-light-orange border-b-1 border-[#303030]">
    To activate your profile, you must
    <div className=""></div>
    <Link href="/profile/upgrade" className='mx-1 underline'>subscribe</Link>
    to a plan.
  </div>
);
