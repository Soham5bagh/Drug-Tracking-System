import React, { useState } from 'react'
import Link from 'next/link'
import AuthWrapper from '../components/AuthWrapper'

interface DrugBatch {
  batchId: string
  drugName: string
  manufacturer: string
  quantity: number
  status: string
}

export default function Distributor() {
  const [availableBatches, setAvailableBatches] = useState<DrugBatch[]>([
    // Demo data
    {
      batchId: '0x123...abc',
      drugName: 'Paracetamol',
      manufacturer: '0x456...def',
      quantity: 1000,
      status: 'MANUFACTURED'
    }
  ])

  const handleTransfer = async (batchId: string) => {
    try {
      // TODO: Implement blockchain transfer
      alert('Transfer initiated for batch: ' + batchId)
    } catch (error) {
      console.error('Transfer failed:', error)
      alert('Failed to transfer batch')
    }
  }

  return (
    <AuthWrapper requiredRole="distributor">
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-center mb-8 text-black">
            Distributor Dashboard
          </h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Available Drug Batches</h2>
              
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
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {availableBatches.map((batch) => (
                            <tr key={batch.batchId}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{batch.batchId}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.drugName}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.manufacturer}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.quantity}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.status}</td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <button
                                  onClick={() => handleTransfer(batch.batchId)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Transfer to Pharmacy
                                </button>
                              </td>
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
        </main>
      </div>
    </AuthWrapper>
  )
} 