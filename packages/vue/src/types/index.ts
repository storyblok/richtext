import { VNode } from 'vue';
import { SbRichTextDocumentNode, SbRichTextResolvers } from '@storyblok/richtext';

export interface SbRichTextProps {
  doc: SbRichTextDocumentNode;
  resolvers: SbRichTextResolvers<VNode>
}
