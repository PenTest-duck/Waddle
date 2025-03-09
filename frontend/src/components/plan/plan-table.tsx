"use client";

import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addSubject, selectPlan } from "@/lib/features/plan/plan-slice";
import { PlanTableSubject } from "./plan-table-subject";
import { Input } from "../ui/input";

interface PlanTableProps {
  isEditingSubjects?: boolean
}

export const PlanTable = ({ isEditingSubjects = false }: PlanTableProps) => {
  const plan = useAppSelector(selectPlan);
  const dispatch = useAppDispatch();

  const [startDayOffset, setStartDayOffset] = useState(0)
  const [newSubject, setNewSubject] = useState("");

  const handleStopCreateNewSubject = () => {
    setNewSubject("");
  }
  
  // Generate 14 days for the table
  const currentDate = new Date();
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(currentDate, i + startDayOffset)
    let label = ""

    if (i + startDayOffset === 0) {
      label = "Today"
    } else if (i + startDayOffset === 1) {
      label = "Tomorrow"
    } else {
      label = format(date, "EEEE")
    }

    return {
      date,
      label,
      dateString: format(date, "MMM d"),
      isToday: i + startDayOffset === 0,
    }
  });

  if (!plan) return null;

  return (
    <div className="max-w-full border rounded-lg overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-r bg-muted p-2 text-left font-medium w-40 sticky left-0 z-10">
                Subjects
              </th>
              {days.map((day, index) => (
                <th
                  key={index}
                  className={cn(
                    "border-b p-2 text-center font-medium min-w-[180px]",
                    day.isToday && "bg-blue-50 dark:bg-blue-950",
                  )}
                >
                  <div className="font-black">{day.label}</div>
                  <div className="text-xs text-muted-foreground">{day.dateString}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plan.subjectIds.map((subjectId) => (
              <PlanTableSubject key={subjectId} dates={days.map(day => format(day.date, "yyyy-MM-dd"))} subjectId={subjectId} />
            ))}
            {isEditingSubjects && (
              <tr key="new-subject">
                <td className="border-r border-b bg-background sticky left-0 p-2">
                  <Input
                    placeholder="New subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    autoFocus
                    className="h-full border-0 border-b border-gray-300 rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onBlur={handleStopCreateNewSubject}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (newSubject.trim() === "") return;
                        dispatch(addSubject({ subject: { name: newSubject } }));
                        handleStopCreateNewSubject();
                      } else if (e.key === 'Escape') {
                        handleStopCreateNewSubject();
                      }
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}