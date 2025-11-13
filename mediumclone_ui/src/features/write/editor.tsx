import StarterKit from "@tiptap/starter-kit";
import { FontSize, TextStyleKit } from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading';
import { Write } from "./Write";
import TextAlign from '@tiptap/extension-text-align';
import { useEditor } from "@tiptap/react";
import {Image} from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
const extensions = [TextStyleKit,Placeholder.configure({
  placeholder : "Tell your story..."
}), StarterKit, Image.configure({
      allowBase64 : true,
      inline : false,
    }),];
export const Editor = () => {
  const editor = useEditor({
    extensions,
    
    content : "<p></p>"
  });
  const titleEditor = useEditor({
  extensions: [
    StarterKit,
    Image.configure({
      allowBase64 : true,
      inline : false,
    }),
    Placeholder.configure({placeholder : "Title"}),
    FontSize.configure({types : ["textStyle"]}),
    Heading.configure({ levels: [1, 2, 3] }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ],
  content: '',
});
  return (
    <div>
      <Write editor={editor} titleEditor={titleEditor}/>
    </div>
  )}