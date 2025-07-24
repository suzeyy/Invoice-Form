# Invoice Form App

A dynamic and responsive invoice generation application built with **React** and **Tailwind CSS**. This tool allows users to add invoice items, calculate amounts in real-time, and view a summary including quantity, discounts, tax, and subtotal.

## Features

- 📋 Add/remove multiple invoice items dynamically
- 🛍️ Select products with auto-filled rate and description
- 🔢 Input quantity, discount (%), and tax (%)
- 💸 Real-time calculations of:
  - Actual Amount
  - Discount Amount
  - Tax Amount
  - Sub Total
- 📦 Products preloaded with ID, name, rate, and description
- 🧾 Clean UI using Tailwind CSS

## Technologies Used

- ⚛️ React (useState, useEffect)
- 💨 Tailwind CSS
- 🧠 JavaScript (ES6+)

## File Structure

src/
├── components/
│   └── InvoiceForm.jsx  # Main invoice form logic
├── App.jsx
└── index.css            # Tailwind CSS imports

## How it Works

- On selecting an item, its rate and description are auto-filled.

- Quantity is set to 1 by default and changes dynamically.

- Summary section automatically updates totals whenever input values change.

- Items with no selection or rate will show default values (0).

## Customization

The product list in the products array in InvoiceForm.jsx can be updated to fit the use case.
