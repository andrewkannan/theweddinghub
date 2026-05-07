"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Clock, MapPin, Trash2, GripVertical } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ScheduleItem = {
  id: string
  title: string
  startTime: Date
  endTime: Date
  location: string | null
  description: string | null
}

function SortableItem(props: { item: ScheduleItem, onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative pl-8 pb-8 group">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200"></div>
      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white"></div>
      
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
        <div 
          className="mt-1 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500"
          {...attributes} 
          {...listeners}
        >
          <GripVertical className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-slate-900 text-lg">{props.item.title}</h4>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-lg">
              <Clock className="w-4 h-4 text-indigo-500" />
              {format(new Date(props.item.startTime), 'HH:mm')} - {format(new Date(props.item.endTime), 'HH:mm')}
            </div>
          </div>
          
          {props.item.location && (
            <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-2">
              <MapPin className="w-4 h-4" /> {props.item.location}
            </div>
          )}
          
          {props.item.description && (
            <p className="text-sm text-slate-600">{props.item.description}</p>
          )}
        </div>

        <button 
          onClick={() => props.onDelete(props.item.id)}
          className="text-slate-300 hover:text-rose-500 p-2 rounded-lg hover:bg-rose-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ScheduleTimeline({ initialItems, deleteAction }: { initialItems: ScheduleItem[], deleteAction: (id: string) => Promise<void> }) {
  const [items, setItems] = useState(initialItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      // In a real app, you would dispatch an update to the server here to save the new order.
      // Since we use startTime for sorting originally, maybe we should update startTimes based on drag, 
      // but for simplicity we just reorder the array visually.
    }
  }

  const handleDelete = async (id: string) => {
    await deleteAction(id);
    setItems(items.filter(i => i.id !== id));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div className="ml-4">
          {items.map(item => (
            <SortableItem key={item.id} item={item} onDelete={handleDelete} />
          ))}
          {items.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-slate-500">
              Your timeline is empty. Add events to build your wedding day schedule!
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}
