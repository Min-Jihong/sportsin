"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchBar = ({ value, onChange, placeholder = "검색...", onFocus, onBlur }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Search className="w-5 h-5 text-white/50" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-white/30 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white/50" />
        </button>
      )}
    </div>
  );
};

