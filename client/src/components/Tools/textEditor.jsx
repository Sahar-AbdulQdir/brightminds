import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Image } from "@tiptap/extension-image";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import FontSize from "./FontSize";
import "./ToolsStyles/txtEditor.css";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaLink,
  FaUnlink,
  FaHighlighter,
  FaCode,
  FaUndo,
  FaRedo,
  FaImage,
  FaTable,
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";

const TextEditor = ({ onChange }) => {
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");

  const editor = useEditor({
    extensions: [
      StarterKit, // includes bold, italic, strike, codeBlock, etc.
      TextStyle,
      FontFamily.configure({ types: ["textStyle"] }),
      FontSize.configure({ types: ["textStyle"] }),
      Underline, // StarterKit does NOT include underline
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Highlight,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: "Start typing..." }),
    ],
    content: "",
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const IconButton = ({ icon, onClick, active }) => (
    <button onClick={onClick} className={active ? "active" : ""}>
      {icon}
    </button>
  );

  const applyFontFamily = (family) => {
    setFontFamily(family);
    editor.chain().focus().setFontFamily(family).run();
  };

  const applyFontSize = (size) => {
    setFontSize(size);
    editor.chain().focus().setFontSize(size).run();
  };

  return (
    <div className="textEditorContainer">
      {/* Toolbar */}
      <div className="toolbar">
        <select value={fontFamily} onChange={(e) => applyFontFamily(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>

        <select value={fontSize} onChange={(e) => applyFontSize(e.target.value)}>
          {["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Formatting Buttons */}
        <IconButton
          icon={<FaBold />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        />
        <IconButton
          icon={<FaItalic />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        />
        <IconButton
          icon={<FaUnderline />}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        />
        <IconButton
          icon={<FaStrikethrough />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        />
        <IconButton
          icon={<FaAlignLeft />}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        />
        <IconButton
          icon={<FaAlignCenter />}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        />
        <IconButton
          icon={<FaAlignRight />}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
        />
        <IconButton
          icon={<FaAlignJustify />}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          active={editor.isActive({ textAlign: "justify" })}
        />
        <IconButton
          icon={<FaListUl />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        />
        <IconButton
          icon={<FaListOl />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        />
        <IconButton
          icon={<FaLink />}
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          active={editor.isActive("link")}
        />
        <IconButton
          icon={<FaUnlink />}
          onClick={() => editor.chain().focus().unsetLink().run()}
        />
        <IconButton
          icon={<FaHighlighter />}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
        />
        <IconButton
          icon={<FaCode />}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        />
        <IconButton
          icon={<FaImage />}
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        />
        <IconButton
          icon={<FaTable />}
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()
          }
        />
        <IconButton icon={<FaPlus />} onClick={() => editor.chain().focus().addColumnBefore().run()} />
        <IconButton icon={<FaMinus />} onClick={() => editor.chain().focus().deleteColumn().run()} />
        <IconButton icon={<FaTrash />} onClick={() => editor.chain().focus().deleteTable().run()} />
        <IconButton icon={<FaUndo />} onClick={() => editor.chain().focus().undo().run()} />
        <IconButton icon={<FaRedo />} onClick={() => editor.chain().focus().redo().run()} />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="editorContent" />
    </div>
  );
};

export default TextEditor;
