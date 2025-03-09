"use client";

import { selectPlanItem, toggleCompleted } from "@/lib/features/plan/plan-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface PlanTableItemProps {
  itemId: string;
}

export const PlanTableItem = ({ itemId }: PlanTableItemProps) => {
  const item = useAppSelector(selectPlanItem(itemId));
  const dispatch = useAppDispatch();

  if (!item) return null;
  
  return (
    <li key={itemId} className="flex items-center gap-2">
      <Checkbox 
        id={itemId}
        checked={item.completed}
        onCheckedChange={() => dispatch(toggleCompleted({ itemId }))}
      />
      <Label
        htmlFor={item.id}
        className={cn(
          "text-sm cursor-pointer",
          item.completed && "line-through text-muted-foreground",
          item.type != "todo" && "font-medium text-amber-700 dark:text-amber-400",
        )}
      >
        {item.description}
      </Label>
    </li>
  );
}