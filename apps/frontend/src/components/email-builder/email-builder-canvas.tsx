'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Trash2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Block {
  id: string;
  type: string;
  properties: Record<string, any>;
  styles: Record<string, any>;
}

interface Column {
  id: string;
  width: string;
  blocks: Block[];
}

interface Row {
  id: string;
  type: string;
  columns: Column[];
  settings: Record<string, any>;
}

interface EmailStructure {
  rows: Row[];
  settings: {
    backgroundColor?: string;
    contentWidth?: string;
    fonts?: string[];
  };
}

export function EmailBuilderCanvas({
  structure,
  onStructureChange,
  selectedBlock,
  onBlockSelect,
  previewMode,
}: {
  structure: EmailStructure;
  onStructureChange: (structure: EmailStructure) => void;
  selectedBlock: any;
  onBlockSelect: (block: any) => void;
  previewMode: 'desktop' | 'mobile';
}) {
  const [dragOverRowIndex, setDragOverRowIndex] = useState<number | null>(null);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleDrop = (e: React.DragEvent, rowIndex?: number) => {
    e.preventDefault();
    setDragOverRowIndex(null);

    const data = e.dataTransfer.getData('application/json');
    if (!data) return;

    const blockData = JSON.parse(data);

    // Create new row with block
    const newRow: Row = {
      id: generateId(),
      type: 'section',
      columns: [
        {
          id: generateId(),
          width: '100%',
          blocks: [
            {
              id: generateId(),
              type: blockData.type,
              properties: getDefaultProperties(blockData.type),
              styles: getDefaultStyles(blockData.type),
            },
          ],
        },
      ],
      settings: {},
    };

    const newRows = [...structure.rows];
    if (rowIndex !== undefined) {
      newRows.splice(rowIndex + 1, 0, newRow);
    } else {
      newRows.push(newRow);
    }

    onStructureChange({
      ...structure,
      rows: newRows,
    });
  };

  const handleDeleteRow = (rowIndex: number) => {
    const newRows = structure.rows.filter((_, i) => i !== rowIndex);
    onStructureChange({
      ...structure,
      rows: newRows,
    });
  };

  const handleDuplicateRow = (rowIndex: number) => {
    const rowToDuplicate = structure.rows[rowIndex];
    const duplicatedRow = JSON.parse(JSON.stringify(rowToDuplicate));
    duplicatedRow.id = generateId();
    duplicatedRow.columns = duplicatedRow.columns.map((col: Column) => ({
      ...col,
      id: generateId(),
      blocks: col.blocks.map((block: Block) => ({
        ...block,
        id: generateId(),
      })),
    }));

    const newRows = [...structure.rows];
    newRows.splice(rowIndex + 1, 0, duplicatedRow);
    onStructureChange({
      ...structure,
      rows: newRows,
    });
  };

  const canvasWidth = previewMode === 'mobile' ? '375px' : structure.settings.contentWidth || '600px';

  return (
    <div className="w-full h-full p-8 flex justify-center">
      <div
        className="transition-all duration-300"
        style={{ width: canvasWidth, maxWidth: '100%' }}
      >
        <Card className="bg-white shadow-lg">
          {/* Email Container */}
          <div
            style={{ backgroundColor: structure.settings.backgroundColor || '#f5f5f5' }}
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverRowIndex(null);
            }}
            className="min-h-[600px] p-4"
          >
            {structure.rows.length === 0 ? (
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    Email şablonunuzu oluşturmaya başlayın
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sol taraftaki blok kütüphanesinden bir blok sürükleyin
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {structure.rows.map((row, rowIndex) => (
                  <div key={row.id}>
                    {/* Drop Zone Before Row */}
                    <div
                      className={cn(
                        'h-8 flex items-center justify-center transition-all',
                        dragOverRowIndex === rowIndex && 'bg-primary/20 border-2 border-primary border-dashed'
                      )}
                      onDrop={(e) => handleDrop(e, rowIndex - 1)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverRowIndex(rowIndex);
                      }}
                      onDragLeave={() => setDragOverRowIndex(null)}
                    >
                      {dragOverRowIndex === rowIndex && (
                        <Plus className="h-4 w-4 text-primary" />
                      )}
                    </div>

                    {/* Row */}
                    <Card className="group relative hover:ring-2 hover:ring-primary/50 transition-all">
                      {/* Row Controls */}
                      <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 cursor-move"
                        >
                          <GripVertical className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleDuplicateRow(rowIndex)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleDeleteRow(rowIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Row Content */}
                      <div className="p-4">
                        {row.columns.map((column) => (
                          <div key={column.id} style={{ width: column.width }}>
                            {column.blocks.map((block) => (
                              <div
                                key={block.id}
                                className={cn(
                                  'p-2 rounded cursor-pointer transition-all',
                                  selectedBlock?.id === block.id && 'ring-2 ring-primary'
                                )}
                                onClick={() => onBlockSelect(block)}
                              >
                                <BlockRenderer block={block} />
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                ))}

                {/* Drop Zone After Last Row */}
                <div
                  className="h-16 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded hover:bg-accent/50 transition-colors"
                  onDrop={(e) => handleDrop(e)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading':
      return (
        <h1
          style={{
            fontSize: block.styles.fontSize || '24px',
            fontWeight: block.styles.fontWeight || 'bold',
            color: block.styles.color || '#333333',
            textAlign: block.properties.align || 'left',
          }}
        >
          {block.properties.text || 'Başlık Metni'}
        </h1>
      );

    case 'text':
      return (
        <p
          style={{
            fontSize: block.styles.fontSize || '14px',
            color: block.styles.color || '#333333',
            textAlign: block.properties.align || 'left',
            lineHeight: block.styles.lineHeight || '1.6',
          }}
        >
          {block.properties.text || 'Paragraf metni buraya yazılacak'}
        </p>
      );

    case 'button':
      return (
        <div style={{ textAlign: block.properties.align || 'center' }}>
          <a
            href={block.properties.href || '#'}
            style={{
              display: 'inline-block',
              backgroundColor: block.styles.backgroundColor || '#0066cc',
              color: block.styles.color || '#ffffff',
              padding: block.styles.padding || '12px 24px',
              borderRadius: block.styles.borderRadius || '4px',
              fontSize: block.styles.fontSize || '14px',
              fontWeight: block.styles.fontWeight || 'bold',
              textDecoration: 'none',
            }}
          >
            {block.properties.text || 'Tıklayın'}
          </a>
        </div>
      );

    case 'image':
      return (
        <div style={{ textAlign: block.properties.align || 'center' }}>
          <img
            src={block.properties.src || 'https://via.placeholder.com/600x400'}
            alt={block.properties.alt || 'Resim'}
            style={{
              width: block.styles.width || '100%',
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      );

    case 'divider':
      return (
        <hr
          style={{
            borderColor: block.styles.borderColor || '#dddddd',
            borderWidth: block.styles.borderWidth || '1px',
            borderStyle: 'solid',
            margin: '10px 0',
          }}
        />
      );

    case 'spacer':
      return <div style={{ height: block.styles.height || '20px' }} />;

    default:
      return (
        <div className="p-4 bg-muted rounded text-center text-sm text-muted-foreground">
          {block.type} bloğu
        </div>
      );
  }
}

function getDefaultProperties(blockType: string): Record<string, any> {
  const defaults: Record<string, any> = {
    heading: { text: 'Başlık Metni', level: 'h1', align: 'left' },
    text: { text: 'Paragraf metni buraya yazılacak', align: 'left' },
    button: { text: 'Tıklayın', href: '#', align: 'center' },
    image: { src: 'https://via.placeholder.com/600x400', alt: 'Resim', align: 'center' },
    divider: {},
    spacer: { height: '20px' },
  };
  return defaults[blockType] || {};
}

function getDefaultStyles(blockType: string): Record<string, any> {
  const defaults: Record<string, any> = {
    heading: { fontSize: '24px', fontWeight: 'bold', color: '#333333' },
    text: { fontSize: '14px', color: '#333333', lineHeight: '1.6' },
    button: { backgroundColor: '#0066cc', color: '#ffffff', borderRadius: '4px', padding: '12px 24px' },
    image: { width: '100%' },
    divider: { borderColor: '#dddddd', borderWidth: '1px' },
    spacer: { height: '20px' },
  };
  return defaults[blockType] || {};
}
