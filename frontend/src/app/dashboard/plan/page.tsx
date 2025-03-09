"use client";

import { PlanAssessmentModal } from "@/components/plan/plan-assessment-modal";
import { PlanTable } from "@/components/plan/plan-table";
import { Button } from "@/components/ui/button";
import { addDay, addItem, addSubject, selectPlan, setPlan } from "@/lib/features/plan/plan-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const PlanPage = () => {
  const plan = useAppSelector(selectPlan);
  const dispatch = useAppDispatch();

  const [isEditingSubjects, setIsEditingSubjects] = useState(false);

  useEffect(() => {
    if (plan) return;

    dispatch(setPlan({
      id: "p1",
      subjectIds: ["s1", "s2"],
    }));

    dispatch(addSubject({ subject: {
      id: "s1",
      name: "Maths",
      dayIds: ["d1", "d2", "d3"],
      planId: "p1",
    }}));
    dispatch(addSubject({ subject: {
      id: "s2",
      name: "English",
      dayIds: ["d4", "d5", "d6"],
      planId: "p1",
    }}));

    dispatch(addDay({
      subjectId: "s1",
      day: {
        id: "d1",
        date: format(new Date(), "yyyy-MM-dd"),
        itemIds: ["i1", "i2"],
        subjectId: "s1",
      },
    }));
    dispatch(addDay({
      subjectId: "s1",
      day: {
        id: "d2",
        date: format(new Date(), "yyyy-MM-dd"),
        itemIds: ["i3", "i4"],
        subjectId: "s1",
      },
    }));
    dispatch(addDay({
      subjectId: "s1",
      day: {
        id: "d3",
        date: format(new Date(), "yyyy-MM-dd"),
        itemIds: ["i5", "i6"],
        subjectId: "s1",
      },
    }));
    dispatch(addDay({
      subjectId: "s2",
      day: {
        id: "d4",
        date: format(new Date(), "yyyy-MM-dd"),
        itemIds: ["i7", "i8"],
        subjectId: "s2",
      },
    }));
    dispatch(addDay({
      subjectId: "s2",
      day: {
        id: "d5",
        date: format(new Date(), "yyyy-MM-dd"),
        itemIds: ["i9", "i10"],
        subjectId: "s2",
      },
    }));
    dispatch(addDay({
      subjectId: "s2",
      day: {
        id: "d6",
        date: format(new Date(), "yyyy-MM-dd"),
        itemIds: ["i11", "i12"],
        subjectId: "s2",
      },
    }));

    dispatch(addItem({
      dayId: "d1",
      item: {
        id: "i1",
        dayId: "d1",
        type: "todo",
        description: "Do some maths",
        completed: false,
      },
    }));
    dispatch(addItem({
      dayId: "d1",
      item: {
        id: "i2",
        dayId: "d1",
        type: "todo",
        description: "Practice equations",
        completed: true,
      },
    }));
    dispatch(addItem({
      dayId: "d2",
      item: {
        id: "i3",
        dayId: "d2",
        type: "todo",
        description: "Review calculus notes",
        completed: false,
      },
    }));
    dispatch(addItem({
      dayId: "d2",
      item: {
        id: "i4",
        dayId: "d2",
        type: "todo",
        description: "Complete homework exercises",
        completed: false,
      },
    }));
    dispatch(addItem({
      dayId: "d3",
      item: {
        id: "i5",
        dayId: "d3",
        type: "todo",
        description: "Study for maths quiz",
        completed: false,
      },
    }));
    dispatch(addItem({
      dayId: "d3",
      item: {
        id: "i6",
        dayId: "d3",
        type: "todo",
        description: "Watch tutorial videos",
        completed: true,
      },
    }));
    dispatch(addItem({
      dayId: "d4",
      item: {
        id: "i7",
        dayId: "d4",
        type: "todo",
        description: "Read chapter 3",
        completed: false,
      },
    }));
    dispatch(addItem({
      dayId: "d4",
      item: {
        id: "i8",
        dayId: "d4",
        type: "todo",
        description: "Write summary",
        completed: false,
      },
    }));
    dispatch(addItem({
      dayId: "d5",
      item: {
        id: "i9",
        dayId: "d5",
        type: "todo",
        description: "Grammar exercises",
        completed: true,
      },
    }));
    dispatch(addItem({
      dayId: "d5",
      item: {
        id: "i10",
        dayId: "d5",
        type: "todo",
        description: "Essay planning",
        completed: false,
      },
    }));
    dispatch(addItem({
      dayId: "d6",
      item: {
        id: "i11",
        dayId: "d6",
        type: "todo",
        description: "Write draft essay",
        completed: false,
      },
    }));
    dispatch(addItem({
      dayId: "d6",
      item: {
        id: "i12",
        dayId: "d6",
        type: "todo",
        description: "Vocabulary review",
        completed: true,
      },
    }));
  }, [])

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ml-2">My Study Plan</h1>
        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setIsEditingSubjects(!isEditingSubjects)}
          >
            {isEditingSubjects ? "Done" : "Edit subjects"}
          </Button>
          <PlanAssessmentModal />
        </div>
      </div>
      <PlanTable isEditingSubjects={isEditingSubjects} />
    </div>
  );
}

export default PlanPage;