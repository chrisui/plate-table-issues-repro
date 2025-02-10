'use client';

import { cloneDeep } from 'lodash';
import { withProps } from '@udecode/cn';
import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import {
  BasicMarksPlugin,
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import {
  ParagraphPlugin,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/components/plate-ui/table-cell-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { useEffect } from 'react';
import { RefPlugin } from '@/components/editor/plugins/ref-plugin';
import { RefElement } from '@/components/plate-ui/ref-element';

const mockTable = {
  children: [
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  text: 'Rule',
                },
              ],
              type: 'p',
            },
          ],
          type: 'th',
        },
      ],
      type: 'tr',
    },
    {
      children: [
        {
          children: [
            {
              children: [
                {
                  text: 'Some text in a paragraph. ',
                },
              ],
              type: 'p',
            },
            {
              type: 'ref',
              identifier: 'reference_1',
              label: 'reference_1',
              children: [
                {
                  text: 'im a custom element, nested within a table, and will vanish after later editor.tf.setValue updates',
                },
              ],
              url: '',
              title: 'test title',
            },
          ],
          type: 'td',
        },
      ],
      type: 'tr',
    },
  ],
  type: 'table',
};

const mockValue = [
  {
    children: [{ text: 'Basic Editor' }],
    type: 'h1',
  },
  {
    children: [{ text: 'Heading 2' }],
    type: 'h2',
  },
  {
    children: [{ text: 'Heading 3' }],
    type: 'h3',
  },
  {
    children: [{ text: 'This is a blockquote element' }],
    type: 'blockquote',
  },
  {
    children: [
      { text: 'Basic marks: ' },
      { bold: true, text: 'bold' },
      { text: ', ' },
      { italic: true, text: 'italic' },
      { text: ', ' },
      { text: 'underline', underline: true },
      { text: ', ' },
      { strikethrough: true, text: 'strikethrough' },
      { text: '.' },
    ],
    type: ParagraphPlugin.key,
  },
  mockTable,
];

export const useCreateEditor = () => {
  const editor = usePlateEditor({
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
        }),
        [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className:
            'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
        }),
        h2: withProps(PlateElement, {
          as: 'h2',
          className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
        }),
        h3: withProps(PlateElement, {
          as: 'h3',
          className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
        }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
        [ParagraphPlugin.key]: withProps(PlateElement, {
          as: 'p',
          className: 'mb-4',
        }),
        [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        [TableCellHeaderPlugin.key]: TableCellHeaderElement,
        [TableCellPlugin.key]: TableCellElement,
        [TablePlugin.key]: TableElement,
        [TableRowPlugin.key]: TableRowElement,
        [RefPlugin.key]: RefElement,
      },
    },
    plugins: [
      BasicElementsPlugin,
      BasicMarksPlugin,
      TableCellHeaderPlugin,
      TableCellPlugin,
      TablePlugin,
      TableRowPlugin,
      RefPlugin,
    ],
    value: mockValue,
  });

  // this effect with a timeout simulates the use case of
  // fetching a value from a server and loading into editor
  useEffect(() => {
    const t = setTimeout(() => {
      editor.tf.setValue(cloneDeep(mockValue));
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  return editor;
};
