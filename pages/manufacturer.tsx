import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { registerDrug, initWeb3 } from '../utils/web3';
import AuthWrapper from '../components/AuthWrapper';

interface DrugBatch {
  drugName: string;
  batchNumber: string;
  quantity: number;
  manufacturingDate: string;
  expiryDate: string;
}

export default function ManufacturerDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isWeb3Ready, setIsWeb3Ready] = useState(false);

  const [formData, setFormData] = useState<DrugBatch>({
    drugName: '',
    batchNumber: '',
    quantity: 0,
    manufacturingDate: '',
    expiryDate: ''
  });

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        await initWeb3();
        setIsWeb3Ready(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Web3');
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    // Check if user is authenticated and is a manufacturer
    const userRole = localStorage.getItem('userRole');
    if (!userRole || userRole !== 'manufacturer') {
      router.push('/register?role=manufacturer');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.drugName || !formData.batchNumber || !formData.quantity || 
        !formData.manufacturingDate || !formData.expiryDate) {
      setError('All fields are required');
      return false;
    }

    const mfgDate = new Date(formData.manufacturingDate);
    const expDate = new Date(formData.expiryDate);
    const today = new Date();

    if (mfgDate > today) {
      setError('Manufacturing date cannot be in the future');
      return false;
    }

    if (expDate <= mfgDate) {
      setError('Expiry date must be after manufacturing date');
      return false;
    }

    if (formData.quantity <= 0) {
      setError('Quantity must be greater than 0');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    if (!isWeb3Ready) {
      setError('Web3 is not initialized. Please make sure MetaMask is connected.');
      return;
    }

    setIsLoading(true);

    try {
      // Get manufacturer details from localStorage
      const manufacturerName = localStorage.getItem('entityName');
      const manufacturerAddress = localStorage.getItem('userAddress');

      if (!manufacturerName || !manufacturerAddress) {
        throw new Error('Manufacturer details not found. Please register again.');
      }

      // Convert dates to Unix timestamps
      const mfgDate = Math.floor(new Date(formData.manufacturingDate).getTime() / 1000);
      const expDate = Math.floor(new Date(formData.expiryDate).getTime() / 1000);

      // Register the drug batch on the blockchain
      const result = await registerDrug(
        formData.drugName,
        formData.batchNumber,
        formData.quantity,
        mfgDate,
        expDate
      );

      setSuccess(`Drug batch registered successfully! Transaction Hash: ${result.transactionHash}`);
      
      // Reset form
      setFormData({
        drugName: '',
        batchNumber: '',
        quantity: 0,
        manufacturingDate: '',
        expiryDate: ''
      });

    } catch (err) {
      console.error('Error registering drug batch:', err);
      setError(err instanceof Error ? err.message : 'Failed to register drug batch');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper requiredRole="manufacturer">
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Register New Drug Batch</h2>

                  {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                      {success}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Drug Name</label>
                      <input
                        type="text"
                        name="drugName"
                        value={formData.drugName}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                      <input
                        type="text"
                        name="batchNumber"
                        value={formData.batchNumber}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Manufacturing Date</label>
                      <input
                        type="date"
                        name="manufacturingDate"
                        value={formData.manufacturingDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                          ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} 
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                      >
                        {isLoading ? 'Registering...' : 'Register Drug Batch'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
} 