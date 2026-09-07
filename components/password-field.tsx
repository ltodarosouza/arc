'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  minLength = 1,
  disabled = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: 'current-password' | 'new-password';
  minLength?: number;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="grid gap-2">
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          required
          minLength={minLength}
          maxLength={128}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className="h-12 pr-12"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 grid w-12 place-items-center"
          aria-label={
            visible
              ? 'Ocultar ' + label.toLowerCase()
              : 'Mostrar ' + label.toLowerCase()
          }
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}
