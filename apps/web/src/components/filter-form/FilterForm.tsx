'use client';

import type React from 'react';
import { useState } from 'react';

import { LabelSelect } from '@/components/label-select/LabelSelect';

export function FilterForm() {
  const [formData, setFormData] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    checked: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
      className="max-w-xl w-full space-y-6 bg-muted/50 p-6 rounded-lg bg-primary/50"
    >
      <div className="space-y-4">
        {data.map((item) => (
          <LabelSelect
            key={item.key}
            label={item.key}
            options={item.options}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                [item.key]: value,
              }))
            }
          />
        ))}
      </div>
    </form>
  );
}
