import React, { useState } from 'react'
import Link from 'next/link'
import AuthWrapper from '../components/AuthWrapper'

interface DrugBatch {
  batchId: string
  drugName: string
  manufacturer: string
  distributor: string
  quantity: number
  status: string
  verificationCode?: string
}

export default function Pharmacy() {
  const [drugBatches, setDrugBatches] = useState<DrugBatch[]>([
    // Demo data
    {
      batchId: '0x123...abc',
      drugName: 'Paracetamol',
      manufacturer: '0x456...def',
      distributor: '0x789...ghi',
      quantity: 1000,
      status: 'DELIVERED'
    }
  ])

  const [verificationCode, setVerificationCode] = useState('')
  const [selectedBatchId, setSelectedBatchId] = useState('')

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: Implement blockchain verification
      alert('Verification successful for batch: ' + selectedBatchId)
    } catch (error) {
      console.error('Verification failed:', error)
      alert('Failed to verify batch')
    }
  }

  return (
    <AuthWrapper requiredRole="pharmacy">
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Pharmacy Dashboard</h1>

            {/* Drug Batches Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold mb-4">Received Drug Batches</h2>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Batch ID</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Drug Name</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Manufacturer</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Distributor</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {drugBatches.map((batch) => (
                              <tr key={batch.batchId}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{batch.batchId}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.drugName}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.manufacturer}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.distributor}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.quantity}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Form */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Verify Drug Batch</h3>
                <div className="mt-5">
                  <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                      <label htmlFor="batchId" className="block text-sm font-medium text-gray-700">
                        Select Batch
                      </label>
                      <select
                        id="batchId"
                        value={selectedBatchId}
                        onChange={(e) => setSelectedBatchId(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Select a batch</option>
                        {drugBatches.map((batch) => (
                          <option key={batch.batchId} value={batch.batchId}>
                            {batch.drugName} - {batch.batchId}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        id="verificationCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Verify Batch
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
}
