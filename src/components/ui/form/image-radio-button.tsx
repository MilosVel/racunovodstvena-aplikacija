import clsx from 'clsx';
import React from 'react';

type ImageRadioButtonProps = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

export function ImageRadioButton({
  id,
  name,
  value,
  checked,
  children,
  onChange,
}: ImageRadioButtonProps) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        'flex cursor-pointer items-center rounded-xl border p-1',
        checked ? 'border-2 border-blue-500' : 'border-2 border-transparent',
      )}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className="h-full w-full">{children}</div>
    </label>
  );
}
