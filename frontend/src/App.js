import React from 'react';
import Test from './Test';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Test Component */}
      <Test />

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Expense Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Expense Form Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Add Expense
              </button>
            </form>
          </section>

          {/* Expense List Section */}
          <section className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-center p-3 border-b">
                  <span>Expense {item}</span>
                  <span className="font-medium">${item * 10}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;