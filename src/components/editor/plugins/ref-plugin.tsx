import { createSlatePlugin } from '@udecode/plate';

export const RefPlugin = createSlatePlugin({
  key: 'ref',
  node: {
    isElement: true,
    isInline: true,
  },
  enabled: true,
});
