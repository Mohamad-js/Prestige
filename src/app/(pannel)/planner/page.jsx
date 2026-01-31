'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Kanban, KanbanBoard, KanbanColumn, KanbanColumnContent, KanbanColumnHandle, KanbanItem, KanbanItemHandle, KanbanOverlay } from '@/components/ui/kanban';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MeshGradientBg } from '@/components/ui/paper-mesh';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';


const COLUMN_TITLES= {
  backlog: 'Backlog',
  inProgress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

const STORAGE_KEY = 'planner-kanban-tasks-v1';

function TaskCard({
  task,
  columnKey,
  onMoveTask,
  asHandle,
  onDeleteTask,
  ...props
}) {
  const cardContent = (
    <div className="rounded-md border bg-card p-3 shadow-xs">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="whitespace-pre-wrap wrap-break-word font-medium text-sm">{task.title}</span>
          <Badge
            variant={
              task.priority === 'high'
                ? 'destructive'
                : task.priority === 'normal'
                ? 'default'
                : 'secondary'
            }
            className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize shrink-0"
          >
            {task.priority}
          </Badge>
          {
            task.description && (
               <div className="text-sm text-muted-foreground whitespace-pre-wrap break-words mt-1">
                  {task.description}
               </div>
         )}

        </div>
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          {task.assignee && (
            <div className="flex items-center gap-1">
              <Avatar className="size-4">
                <AvatarImage src={task.assigneeAvatar} />
                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="line-clamp-1">{task.assignee}</span>
            </div>
          )}
          {task.dueDate && (
            <time className="text-[10px] tabular-nums whitespace-nowrap">
              {task.dueDate}
            </time>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
      {columnKey === "backlog" && (
         <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
            e.stopPropagation();
            onMoveTask?.(task.id, "backlog", "inProgress");
            }}
         >
            Start
         </Button>
      )}

      {(columnKey === "inProgress" || columnKey === "review") && (
         <Button
            size="sm"
            variant="default"
            onClick={(e) => {
            e.stopPropagation();
            onMoveTask?.(task.id, columnKey, "done");
            }}
         >
            Done
         </Button>
      )}

      <Button
         size="sm"
         variant="destructive"
         onClick={(e) => {
            e.stopPropagation();
            onDeleteTask?.(task.id, columnKey);
         }}
      >
         Delete
      </Button>
      </div>

    </div>
  );

  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle ? <KanbanItemHandle>{cardContent}</KanbanItemHandle> : cardContent}
    </KanbanItem>
  );
}

function TaskColumn({
  value,
  tasks,
  isOverlay,
  onMoveTask,
  onDeleteTask,
  ...props
}) {
  return (
    <KanbanColumn
      value={value}
      {...props}
      className="rounded-md border p-2.5 shadow-xs min-h-120 bg-white/20 backdrop-blur-xs"
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-sm">{COLUMN_TITLES[value] || value}</span>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
        <KanbanColumnHandle asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <GripVertical className="h-4 w-4" />
          </Button>
        </KanbanColumnHandle>
      </div>
      <KanbanColumnContent value={value} className="flex flex-col gap-2.5 p-0.5 min-h-25">
         {tasks.map((task) => (
            <TaskCard 
               key={task.id}
               task={task}
               columnKey={value}
               asHandle={!isOverlay}
               onMoveTask={onMoveTask}
               onDeleteTask={onDeleteTask}
            />
         ))}
      </KanbanColumnContent>
    </KanbanColumn>
  );
}

export default function PlannerPage() {
   const [columns, setColumns] = useState(() => {
      if (typeof window === 'undefined') return { backlog: [], inProgress: [], review: [], done: [] };

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
         try {
            return JSON.parse(saved);
         } catch (err) {
            console.error('Failed to parse kanban data', err);
         }
      }
      return { backlog: [], inProgress: [], review: [], done: [] };
   });

   useEffect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
   }, [columns]);

   const [newTaskTitle, setNewTaskTitle] = useState('');
   const [selectedColumn, setSelectedColumn] = useState('backlog');
   const [selectedPriority, setSelectedPriority] = useState('normal');
   const [newTaskDescription, setNewTaskDescription] = useState('');



   const handleAddTask = () => {
      if (!newTaskTitle.trim()) return;

      const newTask = {
         id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
         title: newTaskTitle.trim(),
         priority: selectedPriority,
         description: newTaskDescription.trim(),
      };

      setColumns((prev) => ({
         ...prev,
         [selectedColumn]: [...(prev[selectedColumn] ?? []), newTask],
      }));

      setNewTaskTitle('');
      setSelectedPriority('normal');
      setNewTaskDescription('');

  };

   const [hydrated, setHydrated] = useState(false);

   useEffect(() => {
      try {
         const saved = localStorage.getItem(STORAGE_KEY);
         if (saved) setColumns(JSON.parse(saved));
      } catch (err) {
         console.error("Failed to parse kanban data", err);
      } finally {
         setHydrated(true);
      }
   }, []);

   useEffect(() => {
      if (!hydrated) return;
         localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
   }, [columns, hydrated]);

   if (!hydrated) {
      return (
         <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-6 md:py-10">
               <p className="text-muted-foreground">Loading board...</p>
            </div>
         </div>
      );
   }

   const moveTask = (taskId, fromColumn, toColumn) => {
      setColumns((prev) => {
         const fromTasks = prev[fromColumn] ?? [];
         const toTasks = prev[toColumn] ?? [];

         const taskToMove = fromTasks.find((t) => t.id === taskId);
         if (!taskToMove) return prev;

         return {
            ...prev,
            [fromColumn]: fromTasks.filter((t) => t.id !== taskId),
            [toColumn]: [...toTasks, taskToMove],
         };
      });
   };

   const deleteTask = (taskId, columnKey) => {
      setColumns((prev) => ({
         ...prev,
         [columnKey]: (prev[columnKey] ?? []).filter((t) => t.id !== taskId),
      }));
   };

   const columnsTitle = [
      { label: "Backlog", value: "backlog" },
      { label: "In Progress", value: "inProgress" },
      { label: "Review", value: "review" },
      { label: "Done", value: "done" },
   ];

   const priorityLevels = [
      { label: "Low", value: "low" },
      { label: "Normal", value: "normal" },
      { label: "High", value: "high" },
   ];


  return (
    <div className="min-h-screen">
      <MeshGradientBg/>

      <div className="w-full p-5">
        {/* Add form */}
        <div className="mb-8 flex flex-wrap gap-3 items-end bg-muted/40 p-4 rounded-lg border">
          <div className="flex-1 min-w-55">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTask())}
            />

            <textarea
               value={newTaskDescription}
               onChange={(e) => setNewTaskDescription(e.target.value)}
               placeholder="Task description (optional)"
               className="w-full mt-2 px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
               rows={2}
            />
          </div>

         <Combobox value={selectedColumn} onValueChange={(val) => setSelectedColumn(val)}>
            <ComboboxInput placeholder="Select a column" />
            <ComboboxContent>
               <ComboboxList>
                  {columnsTitle.map((item) => (
                     <ComboboxItem key={item.value} value={item.value}>
                        {item.label}
                     </ComboboxItem>
                  ))}
               </ComboboxList>
            </ComboboxContent>
         </Combobox>

         <Combobox value={selectedPriority} onValueChange={(val) => setSelectedPriority(val)}>
            <ComboboxInput placeholder="Select a priority" />
            <ComboboxContent>
               <ComboboxList>
                  {priorityLevels.map((item) => (
                     <ComboboxItem key={item.value} value={item.value}>
                        {item.label}
                     </ComboboxItem>
                  ))}
               </ComboboxList>
            </ComboboxContent>
         </Combobox>

          <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
            Add Task
          </Button>
        </div>

        {/* Board */}
        <Kanban value={columns} onValueChange={setColumns} getItemValue={(item) => item.id}>
          <KanbanBoard className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Object.entries(columns).map(([col, tasks]) => (
              <TaskColumn key={col} value={col} tasks={tasks ?? []}  onMoveTask={moveTask} onDeleteTask={deleteTask} />
            ))}
          </KanbanBoard>

          <KanbanOverlay>
            {({ value, variant }) => {
              if (variant === 'column') {
                const tasks = columns[value] ?? [];
                return <TaskColumn value={String(value)} tasks={tasks} isOverlay onMoveTask={moveTask} onDeleteTask={deleteTask} />;
              }
              const task = Object.values(columns).flat().find((t) => t.id === value);
              return task ? <TaskCard task={task} /> : null;
            }}
          </KanbanOverlay>
        </Kanban>
      </div>
    </div>
  );
}