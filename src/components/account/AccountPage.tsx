import React from 'react';
import { User, Settings, ArrowLeft } from 'lucide-react';
import { PasswordChangeForm } from './PasswordChangeForm';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from '../layout/Link';

export function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link
            to="/"
            className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            Impostazioni Account
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-900">
              {user?.username}
            </h2>
            <p className="text-sm text-gray-500">
              Account utente
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Modifica Password
        </h2>
        <PasswordChangeForm />
      </div>
    </div>
  );
}