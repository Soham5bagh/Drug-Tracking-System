import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthWrapperProps {
  children: React.ReactNode;
  requiredRole?: 'manufacturer' | 'distributor' | 'pharmacy';
}

export default function AuthWrapper({ children, requiredRole }: AuthWrapperProps) {
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const entityName = localStorage.getItem('entityName');

    // If no role is stored, redirect to registration
    if (!userRole || !entityName) {
      router.push('/register');
      return;
    }

    // If a specific role is required and user's role doesn't match
    if (requiredRole && userRole !== requiredRole) {
      alert('You are not authorized to access this page');
      router.push('/register');
      return;
    }
  }, [requiredRole, router]);

  return <>{children}</>;
} 