"use client"
import { useRouter } from 'next/router';

export default function DashboardViewComponent() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {pathname === '/dashboard' && (
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Welcome to the Dashboard</h1>
          <p>Select an option from the sidebar to get started.</p>
        </div>
      )}
      {/* Other default content */}
    </main>
  );
}