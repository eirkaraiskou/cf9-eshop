import React, { useState, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  subcategory: string;
  price: number;
}

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filters: {
    subcategory: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, onFilterChange }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // ✅ Compute min/max price
  const initialPrice = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };

    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  // ✅ Controlled range
  const [range, setRange] = useState<[number, number]>([
    initialPrice.min,
    initialPrice.max,
  ]);

  // ✅ Subcategories
  const subcategories = useMemo(
    () => Array.from(new Set(products.map(p => p.subcategory))),
    [products]
  );

  // ✅ Apply filters helper (DRY)
  const applyFilters = (subcategory: string, newRange: [number, number]) => {
    onFilterChange({
      subcategory,
      minPrice: newRange[0],
      maxPrice: newRange[1],
    });
  };

  // ✅ Handlers
  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSubcategory(value);
    applyFilters(value, range);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: 0 | 1
  ) => {
    const value = Number(e.target.value);

    const newRange: [number, number] =
      index === 0
        ? [Math.min(value, range[1]), range[1]] // prevent invalid range
        : [range[0], Math.max(value, range[0])];

    setRange(newRange);
    applyFilters(selectedSubcategory, newRange);
  };

  // ✅ Clear filters
  const handleClearFilters = () => {
    const resetRange: [number, number] = [
      initialPrice.min,
      initialPrice.max,
    ];

    setSelectedSubcategory('');
    setRange(resetRange);

    applyFilters('', resetRange);
  };

  // ✅ Disable clear if already default
  const isDefault =
    selectedSubcategory === '' &&
    range[0] === initialPrice.min &&
    range[1] === initialPrice.max;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-base-100 rounded shadow">

      {/* LEFT SIDE (filters together) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">

        {/* Subcategory */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <img src="/icons/setting.png" className="w-6" />
            <label className="font-semibold">Subcategory:</label>
          </div>

          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            className="input input-bordered w-full sm:w-auto"
          >
            <option value="">All</option>
            {subcategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <label className="font-semibold">Price:</label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="number"
              className="input input-sm input-bordered w-full sm:w-28"
              value={range[0]}
              min={initialPrice.min}
              max={range[1]}
              onChange={e => handlePriceChange(e, 0)}
            />

            <span>–</span>

            <input
              type="number"
              className="input input-sm input-bordered w-full sm:w-28"
              value={range[1]}
              min={range[0]}
              max={initialPrice.max}
              onChange={e => handlePriceChange(e, 1)}
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (button) */}
      <button
        onClick={handleClearFilters}
        disabled={isDefault}
        className="btn btn-outline btn-error w-full sm:w-auto"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilter;