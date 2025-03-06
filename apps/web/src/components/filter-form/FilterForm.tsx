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
  onChange: (selectedOptions1: string[], selectedOptions2: string[]) => void;
}

export function FilterForm({ onChange }: FilterFormProps) {
  const [selectedOptions1, setSelectedOptions1] = useState<string[]>([]);
  const [selectedOptions2, setSelectedOptions2] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(selectedOptions1, selectedOptions2);
  };
  const data = [
    {
      key: 'Material Category',
      options: [
        'Animal Products',
        'Aquatic Products',
        'Flowers',
        'Fruits',
        'Grains',
        'Herbs',
        'Mushrooms & Fungi',
        'Nuts',
        'Vegetables',
        'Other',
      ],
    },
    {
      key: 'Material Form',
      options: [
        'Concentrate',
        'Dried Vegetables and Fruits',
        'Emulsion',
        'Flakes',
        'Fresh',
        'Granules',
        'Liquid',
        'Paste',
        'Powder',
        'Other',
      ],
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl w-full space-y-6 p-6 rounded-lg bg-primary/50"
    >
      <div className="space-y-4">
        {/* Material Category Filter */}
        <MultiSelector
          values={selectedOptions1}
          onValuesChange={setSelectedOptions1}
          loop
          className="max-w-xs"
        >
          <MultiSelectorTrigger>
            <MultiSelectorInput placeholder="Select your framework" />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList>
              {data[0].options.map((option) => (
                <MultiSelectorItem value={option}>{option}</MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
        {/* Material Form Filter */}
        <MultiSelector
          values={selectedOptions2}
          onValuesChange={setSelectedOptions2}
          loop
          className="max-w-xs"
        >
          <MultiSelectorTrigger>
            <MultiSelectorInput placeholder="Select your framework" />
          </MultiSelectorTrigger>
          <MultiSelectorContent>
            <MultiSelectorList>
              {data[1].options.map((option) => (
                <MultiSelectorItem value={option}>{option}</MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      </div>
    </form>
  );
}
