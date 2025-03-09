"use client";

import { selectPlanDays, selectPlanSubject } from "@/lib/features/plan/plan-slice";
import { useAppSelector } from "@/lib/hooks";
import { PlanTableCell } from "./plan-table-cell";

interface PlanTableSubjectProps {
  subjectId: string;
  dates: string[];
}

export const PlanTableSubject = ({ subjectId, dates }: PlanTableSubjectProps) => {
  const subject = useAppSelector(selectPlanSubject(subjectId));
  const planDays = useAppSelector(selectPlanDays);
  
  if (!subject) return null;

  return (
    <tr>
      <td className="border-r border-b bg-background sticky left-0 p-2">{subject.name}</td>
      {dates.map((date) => {
        const planDay = planDays.find((planDay) => planDay.subjectId === subjectId && planDay.date === date);
        if (!planDay) return <PlanTableCell key={`${subjectId}_${date}`} subjectId={subjectId} date={date} />;
        return <PlanTableCell key={planDay.id} dayId={planDay.id} />
      })}
    </tr>
  );
}