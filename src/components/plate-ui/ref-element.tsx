'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';

import { PlateElement } from '@udecode/plate/react';

export const RefElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        ref={ref}
        as="a"
        className={cn(
          className,
          'text-primary decoration-primary bg bg-cyan-200 p-2 font-medium underline underline-offset-4'
        )}
        {...props}
      >
        {children}
      </PlateElement>
    );
  }
);
