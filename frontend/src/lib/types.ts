export type Plan = {
  id: string;
  subjectIds: string[]; // references to PlanSubjects
};

export type PlanSubject = {
  id: string;
  name: string;
  planId: string;       // reference to Plan
  dayIds: string[];     // references to PlanDays
};

export type PlanDay = {
  id: string;
  subjectId: string;    // reference to PlanSubject
  date: string;         // YYYY-MM-DD
  itemIds: string[];    // references to PlanItems
};

export type PlanItem = {
  id: string;
  dayId: string;        // reference to PlanDay
  type: PlanItemType;
  description: string;
  completed: boolean;
};

export type PlanItemType = "todo" | "homework" | "assessment";