import React from 'react';
import { FileText, ArrowLeft, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from './Link';

interface HeaderProps {
  companyName?: string;
  onBack?: () => void;
}

export function Header({ companyName, onBack }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">CSV Viewer</h1>
            </div>
            {companyName && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">{companyName}</span>
              </>
            )}
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <Link 
                to="/account" 
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}