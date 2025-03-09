"use client";

import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { useState } from "react";
import { PlanTableItem } from "./plan-table-item";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addDay, addItem, selectPlanDay, selectPlanItem, selectPlanItems } from "@/lib/features/plan/plan-slice";
import { cn } from "@/lib/utils";

interface PlanTableCellProps {
  dayId?: string;

  // For empty days
  subjectId?: string;
  date?: string;
}

export const PlanTableCell = ({ dayId, subjectId, date }: PlanTableCellProps) => {
  const day = useAppSelector(selectPlanDay(dayId));
  const items = useAppSelector(selectPlanItems);
  const dispatch = useAppDispatch();

  const [newItem, setNewItem] = useState("");
  const [isCreatingNewItem, setIsCreatingNewItem] = useState(false);

  const hasAssessment = items.some((item) => item.type === "assessment" && item.dayId === dayId);

  const handleStopCreateNewItem = () => {
    setIsCreatingNewItem(false);
    setNewItem("");
  };

  return (
    <td className={cn("border p-2 align-top", hasAssessment && "bg-amber-50 dark:bg-amber-950")}>
      <ul className="space-y-2">
        {day?.itemIds.map((itemId) => (
          <PlanTableItem key={itemId} itemId={itemId} />
        ))}
        {isCreatingNewItem ? (
          <li key="new-item" className="flex items-center gap-2">
            <Checkbox
              id="new-item-checkbox"
              disabled={true}
            />
            <Input
              placeholder="New item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              autoFocus
              className="h-full border-0 border-b border-gray-300 rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onBlur={handleStopCreateNewItem}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (newItem.trim() === "") return;
                  let dayId = day?.id;
                  if (!day) {
                    const action = dispatch(addDay({ subjectId, day: { date }}));
                    dayId = action.payload.day?.id;
                  }
                  dispatch(addItem({ dayId, item: { description: newItem } }));
                  handleStopCreateNewItem();
                } else if (e.key === 'Escape') {
                  handleStopCreateNewItem();
                }
              }}
            />
          </li>
        ) : (
          <li
            key="add-item"
            className="text-xs text-muted-foreground cursor-pointer"
            onClick={() => setIsCreatingNewItem(true)}
          >
            + Add item
          </li>
        )}
      </ul>
    </td>
  )
}