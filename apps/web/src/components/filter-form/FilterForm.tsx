'use client';

import type React from 'react';
import { useState } from 'react';

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '../ui/extension/multi-select';

interface FilterFormProps {
  onChange: (selectedOptions: Record<string, string[]>) => void;
}

export function FilterForm({ onChange }: FilterFormProps) {
  const data: Record<string, Record<string, string>>[] = [
    {
      'Material Category': {
        MC001: 'Animal Products',
        MC002: 'Aquatic Products',
        MC003: 'Flowers',
        MC004: 'Fruits',
        MC005: 'Grains',
        MC006: 'Herbs',
        MC007: 'Mushrooms & Fungi',
        MC008: 'Nuts',
        MC009: 'Vegetables',
        MC010: 'Other',
      },
    },
    {
      'Material Form': {
        MFS001: 'Concentrate',
        MFS002: 'Dried Vegetables and Fruits',
        MFS003: 'Flakes',
        MFS004: 'Fresh',
        MFS005: 'Granules',
        MFS006: 'Powder',
        MFL001: 'Emulsion',
        MFL002: 'Liquid',
        MFL003: 'Paste',
        MFL004: 'Oil',
        MFL005: 'Other',
      },
    },
  ];

  const initialFormData = data.reduce(
    (acc, category) => {
      const key = Object.keys(category)[0];
      acc[key] = [];
      return acc;
    },
    {} as Record<string, string[]>
  );

  const [selectedOptions, setSelectedOptions] = useState(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(selectedOptions);
  };

  const handleClearAll = () => {
    setSelectedOptions(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-6 rounded-lg bg-primary/50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-border">Filter</h1>
        <button
          type="button"
          onClick={handleClearAll}
          className="text-primary hover:bg-white/50 py-1 px-2 rounded-full text-sm"
        >
          Clear All
        </button>
      </div>

      <div>
        {data.map((item) => {
          const key = Object.keys(item)[0];
          const options = item[key];

          return (
            <>
              <p className="text-border/70 font-bold mb-2">{key}</p>
              <MultiSelector
                key={key}
                values={selectedOptions[key]}
                onValuesChange={(newValues) =>
                  setSelectedOptions((prev) => ({
                    ...prev,
                    [key]: newValues,
                  }))
                }
                loop
              >
                <MultiSelectorTrigger>
                  <MultiSelectorInput placeholder={`Select ${key}`} />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {Object.entries(options).map(([id, label]) => (
                      <MultiSelectorItem key={id} value={label}>
                        {label}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </>
          );
        })}
      </div>
      <button type="submit" className="hidden">
        submit
      </button>
    </form>
  );
}
