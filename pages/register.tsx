import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type UserRole = 'manufacturer' | 'distributor' | 'pharmacy';

interface FormData {
  role: UserRole;
  entityName: string;
  licenseNumber: string;
  licenseFile: File | null;
  gstin: string;
  cin: string;
  aadharPan: string;
  address: string;
  phone: string;
  email: string;
  declaration: boolean;
  // Additional fields based on role
  manufacturingLicense?: string;  // For manufacturer
  pharmacistRegNo?: string;      // For pharmacy
  wholesaleLicense?: string;     // For distributor
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    role: 'manufacturer',
    entityName: '',
    licenseNumber: '',
    licenseFile: null,
    gstin: '',
    cin: '',
    aadharPan: '',
    address: '',
    phone: '',
    email: '',
    declaration: false
  });

  // Set initial role from query parameter
  useEffect(() => {
    const { role } = router.query;
    if (role && (role === 'manufacturer' || role === 'distributor' || role === 'pharmacy')) {
      setFormData(prev => ({ ...prev, role: role as UserRole }));
    }
  }, [router.query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, licenseFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Store user data in localStorage
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('entityName', formData.entityName);
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userAddress', formData.address);
      
      // Show success message
      alert('Registration successful! Redirecting to dashboard...');

      // Redirect based on role
      switch (formData.role) {
        case 'manufacturer':
          router.push('/manufacturer');
          break;
        case 'distributor':
          router.push('/distributor');
          break;
        case 'pharmacy':
          router.push('/pharmacy');
          break;
        default:
          router.push('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'manufacturer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Manufacturing License No. (Form 25 / 28)</label>
              <input
                type="text"
                name="manufacturingLicense"
                value={formData.manufacturingLicense || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CDSCO Registration Certificate</label>
              <input
                type="file"
                name="licenseFile"
                onChange={handleFileChange}
                className="mt-1 block w-full"
                required
              />
            </div>
          </div>
        );
      case 'distributor':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Wholesale Drug License No. (Form 20B/21B)</label>
              <input
                type="text"
                name="wholesaleLicense"
                value={formData.wholesaleLicense || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Drug License Certificate</label>
              <input
                type="file"
                name="licenseFile"
                onChange={handleFileChange}
                className="mt-1 block w-full"
                required
              />
            </div>
          </div>
        );
      case 'pharmacy':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Retail Drug License No. (Form 20/21)</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pharmacist Registration No.</label>
              <input
                type="text"
                name="pharmacistRegNo"
                value={formData.pharmacistRegNo || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">License Certificate</label>
              <input
                type="file"
                name="licenseFile"
                onChange={handleFileChange}
                className="mt-1 block w-full"
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Select Role</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="manufacturer">Manufacturer</option>
                      <option value="distributor">Distributor</option>
                      <option value="pharmacy">Pharmacy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Entity Name</label>
                    <input
                      type="text"
                      name="entityName"
                      value={formData.entityName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  {renderRoleSpecificFields()}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">GSTIN</label>
                    <input
                      type="text"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">CIN</label>
                    <input
                      type="text"
                      name="cin"
                      value={formData.cin}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhaar/PAN</label>
                    <input
                      type="text"
                      name="aadharPan"
                      value={formData.aadharPan}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="declaration"
                      checked={formData.declaration}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      required
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      I declare that all the information provided is true and accurate
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 