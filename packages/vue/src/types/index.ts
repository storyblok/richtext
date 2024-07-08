import { VNode } from 'vue';
import { SbRichNode, SbRichTextResolvers } from '@storyblok/richtext';

export interface SbRichTextProps {
  doc: SbRichNode<VNode>;
  resolvers: SbRichTextResolvers<VNode>
}
