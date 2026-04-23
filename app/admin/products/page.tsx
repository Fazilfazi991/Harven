"use client";

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Plus, Edit2, Trash2, Loader2, Save, Settings, GripVertical, CheckCircle2 } from 'lucide-react'
import { CategoryManager } from '@/components/admin/CategoryManager'
import { ImagePicker } from '@/components/admin/ImagePicker'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableRow({ row, onEdit, onDelete, draggingIndex, index }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id })
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 1 }

  return (
    <tr 
      ref={setNodeRef} 
      style={style} 
      className={`border-b border-black/5 transition-colors group select-none ${isDragging ? 'bg-cream/80 opacity-50' : 'hover:bg-cream/30'}`}
    >
      <td className="px-4 py-4 text-center cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
        <GripVertical size={16} className="mx-auto text-text-muted/30 group-hover:text-text-muted/70 transition-colors" />
      </td>
      <td className="px-6 py-4">
         {row.image_url ? (
           <img src={row.image_url} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm bg-white" />
         ) : (
           <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center text-text-muted italic text-[0.6rem]">No Img</div>
         )}
      </td>
      <td className="px-6 py-4">
        <div className="font-semibold text-text-dark text-[0.95rem]">{row.name}</div>
        <div className="text-[0.75rem] text-text-muted line-clamp-1 max-w-xs">{row.description}</div>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-cream-warm border border-cream-dark rounded-full text-[0.7rem] text-text-mid font-medium">
          {row.category}
        </span>
      </td>
      <td className="px-6 py-4">
         <span className={`px-2 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider ${row.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {row.is_active ? 'Active' : 'Draft'}
        </span>
      </td>
      <td className="px-6 py-4">
         <div className="flex justify-end gap-2">
            <button 
              onClick={() => onEdit(row)}
              className="p-2 text-text-muted hover:text-forest hover:bg-forest/5 rounded-lg transition-all"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => onDelete(row.id)}
              className="p-2 text-text-muted hover:text-terracotta hover:bg-terracotta/5 rounded-lg transition-all"
            >
              <Trash2 size={16} />
            </button>
         </div>
      </td>
    </tr>
  )
}

export default function ProductsCMS() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCatManagerOpen, setIsCatManagerOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)
  const [orderSaved, setOrderSaved] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from('products').select('*').order('sort_order', { ascending: true })
      if (data) setProducts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const supabase = createClient()
      const { data } = await supabase.from('product_categories').select('*').order('name', { ascending: true })
      if (data) setCategories(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleOpenModal = (product: any = null) => {
    setCurrentProduct(product || { 
      name: '', 
      category: categories.length > 0 ? categories[0].name : 'Spices', 
      image_url: '', 
      description: '', 
      tags: [], 
      is_active: true, 
      sort_order: products.length + 1 
    })
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    
    try {
      if (currentProduct.id) {
        // Update
        const { error } = await supabase
          .from('products')
          .update(currentProduct)
          .eq('id', currentProduct.id)
        if (error) throw error
      } else {
        // Create
        const { error } = await supabase
          .from('products')
          .insert([currentProduct])
        if (error) throw error
      }
      setIsModalOpen(false)
      fetchProducts()
    } catch (error) {
      console.error('Save error:', error)
      alert("Failed to save product.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
       const supabase = createClient()
       await supabase.from('products').delete().eq('id', id)
       setIsModalOpen(false)
       fetchProducts()
    } catch (err) {
       console.error(err)
    }
  }

  const handleDragEnd = async (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = products.findIndex((p) => p.id === active.id)
    const newIndex = products.findIndex((p) => p.id === over.id)
    
    const reordered = arrayMove(products, oldIndex, newIndex)
    setProducts(reordered)

    setSavingOrder(true)
    try {
      const supabase = createClient()
      const updates = reordered.map((p, i) => 
        supabase.from('products').update({ sort_order: i + 1 }).eq('id', p.id)
      )
      await Promise.all(updates)
      setOrderSaved(true)
      setTimeout(() => setOrderSaved(false), 3000)
    } catch (err) {
      console.error("Failed to save order", err)
      alert("Failed to save new order.")
      fetchProducts()
    } finally {
      setSavingOrder(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Products Manager</h1>
          <p className="text-text-muted mt-2">Manage the commodity stock and brands displayed on the website.</p>
        </div>
        <div className="flex items-center gap-4">
          {savingOrder && <span className="text-xs text-forest animate-pulse font-medium">Saving order...</span>}
          {orderSaved && <span className="text-xs text-forest flex items-center gap-1 font-bold"><CheckCircle2 size={12}/> Order saved</span>}
          <div className="flex gap-2">
          <button 
            onClick={() => setIsCatManagerOpen(true)}
            className="bg-white text-text-muted px-4 py-2.5 rounded-xl text-sm font-medium border border-cream-dark hover:bg-cream transition-all flex items-center gap-2"
          >
            <Settings size={18} /> Categories
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-forest text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-forest-deep transition-all shadow-lg shadow-forest/10 flex items-center gap-2"
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-cream/50 font-medium text-text-dark border-b border-black/5">
              <tr>
                <th className="px-4 py-4 w-10"></th>
                <th className="px-6 py-4 w-12">Preview</th>
                <th className="px-6 py-4">Name & Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="animate-spin text-forest" />
                      <span>Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <div className="text-4xl mb-3">📦</div>
                    <div className="text-text-dark font-medium">No Products Found</div>
                    <div className="text-text-muted text-xs mt-1">Start by adding your first commodity or signature brand.</div>
                  </td>
                </tr>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={products.map(p => p.id)} strategy={verticalListSortingStrategy}>
                    {products.map((row, index) => (
                      <SortableRow 
                        key={row.id} 
                        row={row} 
                        index={index}
                        onEdit={handleOpenModal} 
                        onDelete={handleDelete} 
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CATEGORY MANAGER MODAL */}
      <CategoryManager 
        tableName="product_categories" 
        label="Category" 
        isOpen={isCatManagerOpen} 
        onClose={() => setIsCatManagerOpen(false)}
        onUpdate={fetchCategories}
      />

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-forest-darker/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-black/5 flex justify-between items-center bg-cream/30">
              <h2 className="font-display text-xl font-bold text-text-dark">
                {currentProduct?.id ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-dark p-2 rounded-full hover:bg-white/50 transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Product Name *</label>
                  <input 
                    required
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                    placeholder="e.g. Kerala Green Cardamom"
                    className="w-full p-4 bg-cream rounded-xl border border-transparent focus:border-sage focus:outline-none text-[0.9rem]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Category</label>
                  <select 
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    className="w-full p-4 bg-cream rounded-xl border border-transparent focus:border-sage focus:outline-none text-[0.9rem]"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                    {categories.length === 0 && <option value="Other">Other</option>}
                  </select>
                </div>
              </div>

              <ImagePicker 
                label="Product Image"
                value={currentProduct.image_url}
                onChange={(url) => setCurrentProduct({...currentProduct, image_url: url})}
              />

              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  rows={4}
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  placeholder="Tell buyers why this commodity is premium..."
                  className="w-full p-4 bg-cream rounded-xl border border-transparent focus:border-sage focus:outline-none text-[0.9rem]"
                />
              </div>

              <div className="flex items-center gap-6 p-4 bg-cream/50 rounded-2xl border border-cream-dark">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={currentProduct.is_active}
                    onChange={(e) => setCurrentProduct({...currentProduct, is_active: e.target.checked})}
                    className="w-5 h-5 accent-forest rounded"
                  />
                  <span className="text-sm font-medium text-text-dark">Publicly Visible</span>
                </label>
                
                <div className="flex items-center gap-3 ml-auto">
                    <span className="text-xs font-bold text-text-muted uppercase">Sort Order</span>
                    <input 
                      type="number"
                      value={currentProduct.sort_order}
                      onChange={(e) => setCurrentProduct({...currentProduct, sort_order: parseInt(e.target.value) || 0})}
                      className="w-20 p-2 bg-white rounded-lg border border-cream-dark text-center text-sm"
                    />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                {currentProduct.id && (
                  <button 
                    type="button"
                    onClick={() => handleDelete(currentProduct.id)}
                    className="flex-1 bg-terracotta/10 text-terracotta py-4 rounded-2xl font-semibold hover:bg-terracotta hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={20} /> Delete Product
                  </button>
                )}
                <button 
                  type="submit"
                  disabled={saving}
                  className={`${currentProduct.id ? 'flex-[2]' : 'w-full'} bg-forest text-white py-4 rounded-2xl font-semibold shadow-xl shadow-forest/20 hover:bg-forest-deep transition-all flex items-center justify-center gap-2`}
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  {currentProduct.id ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
