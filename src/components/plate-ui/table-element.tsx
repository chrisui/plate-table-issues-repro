'use client';

import React from 'react';
import { cn, withRef } from '@udecode/cn';
import { withHOC, PlateElement } from '@udecode/plate/react';
import { TableProvider, useTableElement } from '@udecode/plate-table/react';
import { useSelected } from '@udecode/plate/react';

export const TableElement = withHOC(
  TableProvider,
  withRef<typeof PlateElement>(({ children, className, ...props }, ref) => {
    const selected = useSelected();
    const {
      isSelectingCell,
      marginLeft,
      props: tableProps,
    } = useTableElement();

    const content = (
      <PlateElement
        className={cn(className, 'overflow-x-auto py-5')}
        style={{ paddingLeft: marginLeft }}
        {...props}
      >
        <div className="group/table relative w-fit">
          <table
            ref={ref}
            className={cn(
              'ml-px mr-0 table h-px table-fixed border-collapse',
              isSelectingCell && 'selection:bg-transparent'
            )}
            {...tableProps}
          >
            <tbody className="min-w-full">{children}</tbody>
          </table>
        </div>
      </PlateElement>
    );

    return content;
  })
);
