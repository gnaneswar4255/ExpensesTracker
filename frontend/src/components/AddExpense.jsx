import { useState } from 'react';

export default function AddExpense() {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Expense added:', formData);
    // Add your API call here
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}