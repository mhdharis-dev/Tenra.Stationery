import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8F8F6] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="max-w-md bg-white border border-[#E6E8EB] p-10 shadow-sm space-y-4">
        <span className="font-mono text-4xl font-extrabold text-[#D4AF37]">404</span>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">Page Not Found</h1>
        <p className="text-xs text-[#667085] leading-relaxed">
          The page or product line you are looking for does not exist or has been relocated.
        </p>
        <div className="pt-4">
          <Button variant="primary" onClick={() => navigate('/')} icon={ArrowLeft}>
            Return to TENRA Home
          </Button>
        </div>
      </div>
    </div>
  );
}
