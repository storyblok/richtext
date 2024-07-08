import { VNode } from 'vue';
import { SbRichTextNode, SbRichTextResolvers } from '@storyblok/richtext';

export interface SbRichTextProps {
  doc: SbRichTextNode<VNode>;
  resolvers: SbRichTextResolvers<VNode>
}
