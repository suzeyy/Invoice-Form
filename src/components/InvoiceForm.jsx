import React, { useState, useEffect } from 'react';

const InvoiceForm = () => {
  const [items, setItems] = useState([
    {
      productId: '',
      quantity: 0,
      rate: 0,
      discount: 0,
      tax: 0,
    },
  ]);

  const [summary, setSummary] = useState({
    quantity: 0,
    actualAmount: 0,
    discountAmount: 0,
    taxAmount: 0,
    subTotal: 0,
  });

  const products = [
    { id: '1', name: 'Ergonomic Chair', rate: 1500, description: 'Comfortable office chair with lumbar support.' },
    { id: '2', name: 'Standing Desk', rate: 4500, description: 'Adjustable height standing desk.' },
    { id: '3', name: 'LED Monitor', rate: 2999, description: '27-inch Full HD LED monitor with thin bezels.' },
    { id: '4', name: 'Desk Lamp', rate: 450, description: 'Energy-efficient LED desk lamp with adjustable arm.' },
    { id: '5', name: 'Filing Cabinet', rate: 1800, description: 'Steel 3-drawer filing cabinet with lock.' },
  ];

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    const numericFields = ['quantity', 'rate', 'discount', 'tax'];

    if (numericFields.includes(field)) {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue) || parsedValue < 0) return;
      updatedItems[index][field] = parsedValue;
    } else {
      updatedItems[index][field] = value;
    }

    if (field === 'productId') {
      const selectedProduct = products.find(p => p.id === value);
      updatedItems[index].rate = selectedProduct ? selectedProduct.rate : 0;
      updatedItems[index].quantity = selectedProduct ? 1 : 0;
    }

    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const calculateAmount = (item) => {
    const qty = parseFloat(item.quantity || 0);
    const rate = parseFloat(item.rate || 0);
    const discount = parseFloat(item.discount || 0);
    const tax = parseFloat(item.tax || 0);

    const baseAmount = qty * rate;
    const discountAmount = baseAmount * (discount / 100);
    const taxedAmount = (baseAmount - discountAmount) * (tax / 100);
    return (baseAmount - discountAmount + taxedAmount).toFixed(2);
  };

  useEffect(() => {
    const totalQty = items.reduce((acc, item) => acc + parseFloat(item.quantity || 0), 0);
    const actual = items.reduce((acc, item) => acc + (parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)), 0);
    const discount = items.reduce((acc, item) => acc + ((parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)) * (parseFloat(item.discount || 0) / 100)), 0);
    const taxed = items.reduce((acc, item) => {
      const base = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
      const discountAmount = base * (parseFloat(item.discount || 0) / 100);
      return acc + ((base - discountAmount) * (parseFloat(item.tax || 0) / 100));
    }, 0);
    const subtotal = actual - discount + taxed;

    setSummary({
      quantity: totalQty,
      actualAmount: actual.toFixed(2),
      discountAmount: discount.toFixed(2),
      taxAmount: taxed.toFixed(2),
      subTotal: subtotal.toFixed(2),
    });
  }, [items]);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Invoice Items</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left w-[30%]">Item</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Rate</th>
            <th className="p-2 text-left">Discount (%)</th>
            <th className="p-2 text-left">Tax (%)</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="border-t align-top">
                <td className="p-2">
                  <select
                    className="w-full p-2 border rounded"
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                  >
                    <option value="">Select Item</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} (${product.rate})
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    min="0"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                    min="0"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={item.discount}
                    onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                    min="0"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={item.tax}
                    onChange={(e) => handleItemChange(index, 'tax', e.target.value)}
                    min="0"
                  />
                </td>
                <td className="p-2 font-semibold">{calculateAmount(item)}</td>
                <td className="p-2">
                  <button
                    className="text-red-600 font-bold text-lg hover:scale-110"
                    onClick={() => handleRemoveItem(index)}
                  >
                    ×
                  </button>
                </td>
              </tr>
              {item.productId && (
                <tr key={`desc-${index}`}>
                  <td colSpan="7" className="p-2 text-sm text-gray-500">
                    {products.find(p => p.id === item.productId)?.description}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setItems([...items, { productId: '', quantity: 0, rate: 0, discount: 0, tax: 0 }])}
        >
          + Add Item
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded shadow-sm w-full">
        <p>Total Quantity: {summary.quantity}</p>
        <p>Actual Amount: ${summary.actualAmount}</p>
        <p>Discount Amount: ${summary.discountAmount}</p>
        <p>Tax Amount: ${summary.taxAmount}</p>
        <p className="font-bold">Sub Total: ${summary.subTotal}</p>
      </div>
    </div>
  );
};

export default InvoiceForm;
