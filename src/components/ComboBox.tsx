// components/ComboBox.tsx
import React, { useState, useEffect } from 'react';
import { Select, SelectItem, SelectTrigger, SelectContent } from './ui/select';

interface ComboBoxProps {
  items: { value: string; label: string }[];
  onSelect: (value: string) => void;
  value: string;
  placeholder: string;
}

export function ComboBox({ items, onSelect, value, placeholder }: ComboBoxProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    setSelectedValue(value);
  }, [selectedValue]);
  
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };
  
  return (
    <Select value={selectedValue ?? ''} onValueChange={handleSelect}>
      <SelectTrigger>
        {selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder}
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
