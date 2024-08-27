import { VNode } from 'vue';
import { StoryblokRichTextDocumentNode, StoryblokRichTextResolvers } from '@storyblok/richtext';

export interface StoryblokRichTextProps {
  doc: StoryblokRichTextDocumentNode;
  resolvers: StoryblokRichTextResolvers<VNode>
}
