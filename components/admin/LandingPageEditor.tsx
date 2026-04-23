"use client";

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Plus, GripVertical, Trash2, X, Text, Table, AlignLeft, List, Image as ImageIcon } from 'lucide-react'
import { ImagePicker } from './ImagePicker'

// Block Item Component (uses native drag handle)
function DraggableBlock({ id, block, onRemove, onChange, index, onDragStart, onDragOver, onDragEnd, onDrop, isDragging, isDragOver }: any) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragEnd={onDragEnd}
      onDrop={(e) => onDrop(e, index)}
      className={`bg-white border text-sm border-black/10 rounded-xl p-4 mb-4 flex gap-4 shadow-sm group select-none transition-all ${
        isDragging ? 'opacity-40 bg-cream/50' : isDragOver ? 'bg-forest/5 border-t-2 border-t-forest/30' : ''
      }`}
    >
      <div className="mt-1 cursor-grab active:cursor-grabbing opacity-50 group-hover:opacity-100 flex-shrink-0">
        <GripVertical size={20} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center mb-2">
           <div className="uppercase tracking-wider font-mono text-[0.6rem] text-text-muted bg-cream px-2 py-1 rounded inline-block">{block.type} Block</div>
           <button type="button" onClick={() => onRemove(id)} className="text-red-500/50 hover:text-red-600"><Trash2 size={16} /></button>
        </div>
        {block.type === 'text' && (
          <textarea 
            value={block.content} 
            onChange={e => onChange(id, { ...block, content: e.target.value })}
            className="w-full p-3 border border-cream-dark rounded-lg bg-cream font-mono text-xs focus:outline-forest" rows={4}
            placeholder="<p>HTML Rich Text Content...</p>"
          />
        )}
        {block.type === 'highlight_box' && (
           <div className="grid grid-cols-2 gap-2">
              <input value={block.icon} onChange={e => onChange(id, { ...block, icon: e.target.value })} placeholder="Icon Emoji" className="p-2 border rounded" />
              <input value={block.text} onChange={e => onChange(id, { ...block, text: e.target.value })} placeholder="Highlight Text" className="p-2 border rounded" />
           </div>
        )}
        {block.type === 'specs_table' && (
           <div className="text-xs text-text-muted">Spec table key/values array builder placeholder...</div>
        )}
        {block.type === 'bullet_list' && (
           <div className="text-xs text-text-muted">Bullet list items array builder placeholder...</div>
        )}
        {block.type === 'image' && (
           <ImagePicker 
             value={block.url || ''} 
             onChange={url => onChange(id, { ...block, url })} 
           />
        )}
      </div>
    </div>
  )
}

export function LandingPageEditor({ initialData = null, onSave }: { initialData?: any, onSave?: (data: any) => void }) {
  const [activeTab, setActiveTab] = useState('basic')
  const [blocks, setBlocks] = useState<any[]>(initialData?.content_blocks || [])
  const [heroImageUrl, setHeroImageUrl] = useState(initialData?.hero_image_url || '')
  const [mounted, setMounted] = React.useState(false)

  // Native drag state
  const dragIndexRef = useRef<number | null>(null)
  const dragOverIndexRef = useRef<number | null>(null)
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSave) return;
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      meta_description: formData.get('meta_description') as string,
      hero_headline: formData.get('hero_headline') as string,
      hero_subtext: formData.get('hero_subtext') as string,
      hero_badge: formData.get('hero_badge') as string,
      hero_image_url: heroImageUrl,
      show_chatbot: formData.get('show_chatbot') === 'on',
      show_inquiry_form: formData.get('show_inquiry_form') === 'on',
      is_published: formData.get('is_published') === 'on',
      content_blocks: JSON.parse((formData.get('content_blocks') as string) || '[]')
    };
    onSave(data);
  }

  // ─── NATIVE DRAG AND DROP ──────────────────────────────────────────────
  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragIndexRef.current = index
    setDraggingIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    dragOverIndexRef.current = index
    setDragOverIndex(index)
  }

  const handleDragEnd = () => {
    setDraggingIndex(null)
    setDragOverIndex(null)
    dragIndexRef.current = null
    dragOverIndexRef.current = null
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIdx = dragIndexRef.current
    if (dragIdx === null || dragIdx === dropIndex) {
      handleDragEnd()
      return
    }

    const newBlocks = [...blocks]
    const [moved] = newBlocks.splice(dragIdx, 1)
    newBlocks.splice(dropIndex, 0, moved)
    setBlocks(newBlocks)
    handleDragEnd()
  }

  const addBlock = (type: string) => {
    setBlocks([...blocks, { id: Date.now().toString(), type, content: '' }])
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden flex flex-col md:flex-row min-h-[60vh]">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 bg-cream-warm border-r border-cream-dark p-4 flex flex-col gap-2">
        {['basic', 'hero', 'content', 'settings'].map(tab => (
          <button 
            key={tab} 
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-forest text-white' : 'text-text-dark hover:bg-cream-dark'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Editor Pane */}
      <form id="landing-page-form" onSubmit={handleSubmit} className="flex-1 p-6 md:p-10 max-h-[75vh] overflow-y-auto">
        <input type="hidden" name="content_blocks" value={JSON.stringify(blocks)} />
        <div className={`flex flex-col gap-6 max-w-xl ${activeTab === 'basic' ? 'block' : 'hidden'}`}>
             <h3 className="font-display text-xl border-b pb-2">Basic Info</h3>
             <label className="flex flex-col gap-2 text-sm text-text-muted">
                Document Title
                <input name="title" type="text" className="p-3 border rounded-xl" defaultValue={initialData?.title} />
             </label>
             <label className="flex flex-col gap-2 text-sm text-text-muted">
                URL Slug
                <input name="slug" type="text" className="p-3 border rounded-xl font-mono" defaultValue={initialData?.slug} />
             </label>
             <label className="flex flex-col gap-2 text-sm text-text-muted">
                SEO Description
                <textarea name="meta_description" className="p-3 border rounded-xl" rows={3} defaultValue={initialData?.meta_description} />
             </label>
        </div>

        <div className={`flex flex-col gap-6 max-w-xl ${activeTab === 'hero' ? 'block' : 'hidden'}`}>
             <h3 className="font-display text-xl border-b pb-2">Hero Section Config</h3>
             <label className="flex flex-col gap-2 text-sm text-text-muted">
                Hero Headline
                <input name="hero_headline" type="text" className="p-3 border rounded-xl" defaultValue={initialData?.hero_headline} />
             </label>
             <label className="flex flex-col gap-2 text-sm text-text-muted">
                Hero Subtext
                <textarea name="hero_subtext" className="p-3 border rounded-xl" rows={3} defaultValue={initialData?.hero_subtext} />
             </label>
             <label className="flex flex-col gap-2 text-sm text-text-muted">
                Badge Text
                <input name="hero_badge" type="text" className="p-3 border rounded-xl" defaultValue={initialData?.hero_badge} />
             </label>
             
             <ImagePicker 
                label="Hero Background Image"
                value={heroImageUrl}
                onChange={setHeroImageUrl}
             />
        </div>

        <div className={`flex flex-col gap-6 max-w-2xl ${activeTab === 'content' ? 'block' : 'hidden'}`}>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-display text-xl">Drag & Drop Builder</h3>
              <div className="flex gap-2">
                <button type="button" onClick={() => addBlock('text')} className="px-3 py-1 bg-cream rounded hover:bg-cream-dark text-xs"><Text size={14} className="inline mr-1" /> Text</button>
                <button type="button" onClick={() => addBlock('specs_table')} className="px-3 py-1 bg-cream rounded hover:bg-cream-dark text-xs"><Table size={14} className="inline mr-1" /> Table</button>
                <button type="button" onClick={() => addBlock('image')} className="px-3 py-1 bg-cream rounded hover:bg-cream-dark text-xs"><ImageIcon size={14} className="inline mr-1" /> Image</button>
              </div>
            </div>

            {blocks.map((block, index) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                index={index}
                block={block}
                onRemove={(id: string) => setBlocks(blocks.filter(b => b.id !== id))}
                onChange={(id: string, newBlock: any) => setBlocks(blocks.map(b => b.id === id ? newBlock : b))}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                isDragging={draggingIndex === index}
                isDragOver={dragOverIndex === index && draggingIndex !== index}
              />
            ))}
            
            {blocks.length === 0 && (
               <div className="text-center py-12 text-sm text-text-muted border-2 border-dashed rounded-xl border-cream-dark">No content blocks added yet. Use the buttons above.</div>
            )}
        </div>

        <div className={`flex flex-col gap-6 max-w-xl ${activeTab === 'settings' ? 'block' : 'hidden'}`}>
             <h3 className="font-display text-xl border-b pb-2">Settings & Toggles</h3>
             <label className="flex items-center gap-3 cursor-pointer p-4 bg-cream rounded-xl">
               <input name="show_chatbot" type="checkbox" className="w-5 h-5 rounded text-forest focus:ring-forest" defaultChecked={initialData?.show_chatbot ?? true} />
               <span className="text-sm font-medium">Enable Contextual AI Chatbot</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer p-4 bg-cream rounded-xl">
               <input name="show_inquiry_form" type="checkbox" className="w-5 h-5 rounded text-forest focus:ring-forest" defaultChecked={initialData?.show_inquiry_form ?? true} />
               <span className="text-sm font-medium">Show Inquiry Form</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer p-4 bg-cream rounded-xl">
               <input name="is_published" type="checkbox" className="w-5 h-5 rounded text-forest focus:ring-forest" defaultChecked={initialData?.is_published ?? false} />
               <span className="text-sm font-medium">Publish Live Online</span>
             </label>
        </div>
      </form>
    </div>
  )
}
