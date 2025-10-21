"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichTextEditor = RichTextEditor;
const react_1 = require("@tiptap/react");
const starter_kit_1 = __importDefault(require("@tiptap/starter-kit"));
const extension_mention_1 = __importDefault(require("@tiptap/extension-mention"));
const toggle_1 = require("@/components/ui/toggle");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const react_2 = require("react");
const tippy_js_1 = __importDefault(require("tippy.js"));
// Mention suggestion component
const MentionList = ({ items, command }) => {
    const [selectedIndex, setSelectedIndex] = (0, react_2.useState)(0);
    const selectItem = (index) => {
        const item = items[index];
        if (item) {
            command(item);
        }
    };
    const upHandler = () => {
        setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };
    const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % items.length);
    };
    const enterHandler = () => {
        selectItem(selectedIndex);
    };
    (0, react_2.useEffect)(() => {
        const onKeyDown = (event) => {
            if (event.key === 'ArrowUp') {
                upHandler();
                return true;
            }
            if (event.key === 'ArrowDown') {
                downHandler();
                return true;
            }
            if (event.key === 'Enter') {
                enterHandler();
                return true;
            }
            return false;
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [selectedIndex]);
    return (<div className="bg-white border border-gray-200 rounded-md shadow-lg p-1 w-48">
      {items.length > 0 ? (items.map((item, index) => (<div key={item.id} className={`px-3 py-2 cursor-pointer rounded ${index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'}`} onClick={() => selectItem(index)}>
            @{item.label}
          </div>))) : (<div className="px-3 py-2 text-gray-500">Kullanıcı bulunamadı</div>)}
    </div>);
};
function RichTextEditor({ content, onChange, placeholder = 'Write something...', className, attachments = [], onAttachmentsChange, }) {
    const [suggestionItems, setSuggestionItems] = (0, react_2.useState)([
        { id: 'usr-001', label: 'Ahmet Yılmaz' },
        { id: 'usr-002', label: 'Zeynep Kaya' },
        { id: 'usr-003', label: 'Mehmet Demir' },
        { id: 'usr-004', label: 'Elif Şahin' },
    ]);
    const [suggestionRange, setSuggestionRange] = (0, react_2.useState)(null);
    const [showSuggestions, setShowSuggestions] = (0, react_2.useState)(false);
    const popupRef = (0, react_2.useRef)(null);
    const editor = (0, react_1.useEditor)({
        extensions: [
            starter_kit_1.default,
            extension_mention_1.default.configure({
                HTMLAttributes: {
                    class: 'mention',
                },
                suggestion: {
                    items: ({ query }) => {
                        return suggestionItems.filter(item => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
                    },
                    render: () => {
                        let component = null;
                        let popup = null;
                        return {
                            onStart: (props) => {
                                component = new react_1.ReactRenderer(MentionList, {
                                    props,
                                    editor: props.editor,
                                });
                                if (!props.clientRect) {
                                    return;
                                }
                                popup = (0, tippy_js_1.default)('body', {
                                    getReferenceClientRect: props.clientRect,
                                    appendTo: () => document.body,
                                    content: component.element,
                                    showOnCreate: true,
                                    interactive: true,
                                    trigger: 'manual',
                                    placement: 'bottom-start',
                                });
                                popupRef.current = popup;
                            },
                            onUpdate: (props) => {
                                component?.updateProps(props);
                                if (!props.clientRect) {
                                    return;
                                }
                                popup?.[0].setProps({
                                    getReferenceClientRect: props.clientRect,
                                });
                            },
                            onKeyDown: (props) => {
                                if (props.event.key === 'Escape') {
                                    popup?.[0].hide();
                                    return true;
                                }
                                return component?.ref?.onKeyDown(props);
                            },
                            onExit: () => {
                                popup?.[0].destroy();
                                component?.destroy();
                            },
                        };
                    },
                },
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: (0, utils_1.cn)('min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className),
            },
        },
    });
    const insertMention = (user) => {
        if (editor) {
            editor
                .chain()
                .focus()
                .insertContent([
                {
                    type: 'mention',
                    attrs: user,
                },
                {
                    type: 'text',
                    text: ' ',
                },
            ])
                .run();
        }
    };
    if (!editor) {
        return null;
    }
    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (!files || !onAttachmentsChange)
            return;
        const newAttachments = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            newAttachments.push({
                id: `file-${Date.now()}-${i}`,
                name: file.name,
                size: file.size,
                type: file.type,
            });
        }
        onAttachmentsChange([...attachments, ...newAttachments]);
        e.target.value = ''; // Reset input
    };
    return (<div className="border rounded-md">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b">
        <toggle_1.Toggle size="sm" pressed={editor.isActive('bold')} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
          <lucide_react_1.Bold className="h-4 w-4"/>
        </toggle_1.Toggle>
        <toggle_1.Toggle size="sm" pressed={editor.isActive('italic')} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
          <lucide_react_1.Italic className="h-4 w-4"/>
        </toggle_1.Toggle>
        <toggle_1.Toggle size="sm" pressed={editor.isActive('bulletList')} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
          <lucide_react_1.List className="h-4 w-4"/>
        </toggle_1.Toggle>
        <toggle_1.Toggle size="sm" pressed={editor.isActive('orderedList')} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
          <lucide_react_1.ListOrdered className="h-4 w-4"/>
        </toggle_1.Toggle>
        <toggle_1.Toggle size="sm" pressed={editor.isActive('blockquote')} onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}>
          <lucide_react_1.Quote className="h-4 w-4"/>
        </toggle_1.Toggle>
        <toggle_1.Toggle size="sm" onPressedChange={() => {
            // Insert @ symbol to trigger mention
            editor.chain().focus().insertContent('@').run();
        }}>
          <lucide_react_1.AtSign className="h-4 w-4"/>
        </toggle_1.Toggle>
        {onAttachmentsChange && (<label>
            <toggle_1.Toggle size="sm" asChild>
              <span>
                <lucide_react_1.Paperclip className="h-4 w-4"/>
                <input type="file" className="hidden" multiple onChange={handleFileSelect}/>
              </span>
            </toggle_1.Toggle>
          </label>)}
      </div>
      <react_1.EditorContent editor={editor} placeholder={placeholder} className="prose prose-sm max-w-none p-3"/>
      {attachments.length > 0 && (<div className="p-2 border-t">
          <div className="text-sm font-medium mb-1">Ekler:</div>
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment) => (<div key={attachment.id} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-xs">
                <lucide_react_1.Paperclip className="h-3 w-3"/>
                <span>{attachment.name}</span>
                <span className="text-muted-foreground">({Math.round(attachment.size / 1024)} KB)</span>
              </div>))}
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=rich-text-editor.js.map