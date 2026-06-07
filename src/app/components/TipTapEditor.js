"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function TipTapEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Tulis konten artikel di sini...",
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-slate-600 rounded-xl overflow-hidden">
      {/* Toolbar */}
<div className="bg-slate-700 px-3 py-2 flex flex-wrap gap-1 border-b border-slate-600 sticky top-0 z-10">        {[
          { label: "B", action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
          { label: "I", action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
          { label: "H1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }) },
          { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
          { label: "H3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
          { label: "• List", action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
          { label: "1. List", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
          { label: "Quote", action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
          { label: "—", action: () => editor.chain().focus().setHorizontalRule().run(), active: false },
          { label: "↩", action: () => editor.chain().focus().undo().run(), active: false },
          { label: "↪", action: () => editor.chain().focus().redo().run(), active: false },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            type="button"
            className={`px-2 py-1 text-xs rounded transition font-medium ${btn.active ? "bg-cyan-500 text-white" : "bg-slate-600 text-gray-300 hover:bg-slate-500"}`}>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
className="bg-slate-700 text-white p-4 prose prose-invert max-w-none focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-64 [&_.ProseMirror]:max-h-[500px] [&_.ProseMirror]:overflow-y-auto"      />
    </div>
  );
}