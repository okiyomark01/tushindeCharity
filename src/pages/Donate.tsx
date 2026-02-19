import React from 'react';
import { Smartphone, Check, ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const Donate: React.FC = () => {
  const chartData = [
    { name: 'Direct Aid (Programs)', value: 85, color: '#006600' },
    { name: 'Operations', value: 10, color: '#374151' },
    { name: 'Fundraising', value: 5, color: '#BB0000' },
  ];

  return (
    <div className="bg-white min-h-screen py-12 animate-fade-in">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Make a Difference Today</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your donation directly funds medical surgeries, school fees, and business startups for families in need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Donation Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-8">
              
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Smartphone className="w-8 h-8 text-green-600" />
                    Donate via M-Pesa
                </h3>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in mb-8">
                    <p className="text-lg text-green-800 font-medium mb-4">Lipa na M-Pesa (Paybill)</p>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Business Number</p>
                            <p className="text-4xl font-bold text-gray-900">247247</p>
                        </div>
                        
                        <div className="w-full h-px bg-green-200 my-4"></div>
                        
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Account Name</p>
                            <p className="text-2xl font-bold text-gray-900">Your Name</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-white p-4 rounded-lg border border-green-100 text-left max-w-md mx-auto">
                        <p className="font-bold text-gray-900 mb-2">How to pay:</p>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                            <li>Go to M-Pesa menu on your phone</li>
                            <li>Select <strong>Lipa na M-Pesa</strong></li>
                            <li>Select <strong>Paybill</strong></li>
                            <li>Enter Business No: <strong>247247</strong></li>
                            <li>Enter Account No: <strong>Your Name</strong></li>
                            <li>Enter Amount (e.g., 500, 1000, 5000)</li>
                            <li>Enter your M-Pesa PIN and Send</li>
                        </ol>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-green-600"/>
                    <span>Secure & Direct Transaction</span>
                </div>
            </div>
          </div>

          {/* Trust/Impact Section */}
          <div className="space-y-8 min-w-0">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 text-center">Where Your Money Goes</h3>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                    We maintain strict financial transparency. 85% of all donations go directly to beneficiaries.
                </p>
            </div>

            <div className="bg-black text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4">The Impact of KES 5,000</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-kenya-green shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">Can buy a full school uniform kit for a primary student.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-kenya-green shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">Can provide emergency food rations for a family for 2 weeks.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-kenya-green shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">Can stock a small roadside kiosk with initial inventory.</span>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};