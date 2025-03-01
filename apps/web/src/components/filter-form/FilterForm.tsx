'use client';

import type React from 'react';
import { useState } from 'react';

import { LabelSelect } from '@/components/label-select/LabelSelect';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

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
    // Handle form submission
  };

  // Sample options for the select components
  const options = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full space-y-6 bg-muted/50 p-6 rounded-lg">
      {/* Select Components */}
      <div className="space-y-4">
        <LabelSelect
          label="XXXXX"
          options={options}
          onChange={(value) => setFormData((prev) => ({ ...prev, option1: value }))}
        />
        <LabelSelect
          label="XXXXX"
          options={options}
          onChange={(value) => setFormData((prev) => ({ ...prev, option2: value }))}
        />
        <LabelSelect
          label="XXXXX"
          options={options}
          onChange={(value) => setFormData((prev) => ({ ...prev, option3: value }))}
        />
        <LabelSelect
          label="XXXXX"
          options={options}
          onChange={(value) => setFormData((prev) => ({ ...prev, option4: value }))}
        />
        <LabelSelect
          label="XXXXX"
          options={options}
          onChange={(value) => setFormData((prev) => ({ ...prev, option5: value }))}
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={formData.checked}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, checked: checked as boolean }))
          }
        />
        <label htmlFor="terms" className="text-sm font-medium leading-none text-muted-foreground">
          XXXXXX
        </label>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">
        CHECK
      </Button>
    </form>
  );
}
