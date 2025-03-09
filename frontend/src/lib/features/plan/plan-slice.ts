import { RootState } from "@/lib/store";
import { Plan, PlanDay, PlanItem, PlanSubject } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

interface PlanState {
  plan?: Plan;
  planSubjects: PlanSubject[];
  planDays: PlanDay[];
  planItems: PlanItem[];
}

const mockState: PlanState = {
  plan: {
    id: "p1",
    subjectIds: ["s1", "s2"],
  },
  planSubjects: [
    {
      id: "s1",
      name: "Maths",
      dayIds: ["d1"],
      planId: "p1",
    },
    {
      id: "s2",
      name: "English",
      dayIds: ["d4", "d5"],
      planId: "p1",
    },
  ],
  planDays: [
    {
      id: "d1",
      date: format(new Date(), "yyyy-MM-dd"),
      itemIds: ["i1", "i2"],
      subjectId: "s1",
    },
    {
      id: "d4",
      date: format(new Date(), "yyyy-MM-dd"),
      itemIds: ["i7", "i8"],
      subjectId: "s2",
    },
    {
      id: "d5",
      date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
      itemIds: ["i9"],
      subjectId: "s2",
    },
  ],
  planItems: [
    {
      id: "i1",
      dayId: "d1",
      type: "todo",
      description: "Do some maths",
      completed: false,
    },
    {
      id: "i2",
      dayId: "d1",
      type: "todo",
      description: "Practice equations",
      completed: true,
    },
    {
      id: "i7",
      dayId: "d4",
      type: "todo",
      description: "Read chapter 3",
      completed: false,
    },
    {
      id: "i8",
      dayId: "d4",
      type: "todo",
      description: "Write summary",
      completed: false,
    },
    {
      id: "i9",
      dayId: "d5",
      type: "assessment",
      description: "Discursive AT1",
      completed: false,
    },
  ],
};

const initialState: PlanState = mockState; 
// {
//   plan: undefined,
//   planSubjects: [],
//   planDays: [],
//   planItems: [],
// };

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<Plan>) => {
      state.plan = action.payload;
    },
    addSubject: (state, action: PayloadAction<{ subject?: Partial<PlanSubject> }>) => {
      if (!state.plan) return;

      const subject: PlanSubject = {
        id: uuidv4(),
        planId: state.plan.id,
        name: "",
        dayIds: [],
        ...action.payload.subject
      };
      state.planSubjects.push(subject);
      state.plan.subjectIds.push(subject.id);
    },
    addDay: (state, action: PayloadAction<{ subjectId?: string, day?: Partial<PlanDay> }>) => {
      if (!action.payload.subjectId) return;
      const subject = state.planSubjects.find((s) => s.id === action.payload.subjectId);
      if (!subject) return;

      const day: PlanDay = {
        id: uuidv4(),
        subjectId: subject.id,
        date: format(new Date(), "yyyy-MM-dd"),
        itemIds: [],
        ...action.payload.day
      };
      state.planDays.push(day);
      subject.dayIds.push(day.id);
      action.payload.day = day;
    },
    addItem: (state, action: PayloadAction<{ dayId?: string, item?: Partial<PlanItem> }>) => {
      if (!action.payload.dayId) return;
      const day = state.planDays.find((d) => d.id === action.payload.dayId);
      if (!day) return;

      const item: PlanItem = {
        id: uuidv4(),
        dayId: day.id,
        type: "todo",
        description: "",
        completed: false,
        ...action.payload.item
      };
      state.planItems.push(item);
      day.itemIds.push(item.id);
    },
    toggleCompleted: (state, action: PayloadAction<{ itemId: string }>) => {
      const item = state.planItems.find((i) => i.id === action.payload.itemId);
      if (!item) return;

      item.completed = !item.completed;
    },
  },
});

export const { setPlan, addSubject, addDay, addItem, toggleCompleted } = planSlice.actions;

export const selectPlan = (state: RootState) => state.plans.plan;
export const selectPlanSubject = (subjectId: string) => (state: RootState) => state.plans.planSubjects.find((s) => s.id === subjectId);
export const selectPlanDay = (dayId?: string) => (state: RootState) => {
  if (!dayId) return undefined;
  return state.plans.planDays.find((d) => d.id === dayId);
};
export const selectPlanDays = (state: RootState) => state.plans.planDays;
export const selectPlanItem = (itemId: string) => (state: RootState) => state.plans.planItems.find((i) => i.id === itemId);
export const selectPlanItems = (state: RootState) => state.plans.planItems;

export default planSlice.reducer;