"use client";
import type * as React from "react";
import { Example } from "@/components/examples/example";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { toast } from "@/components/ui/toast";
export default function Preview() {
  return (
    <div className="example-stack">
      <QuestionnaireStandalone />
    </div>
  );
}
const questionnaireItems = [
  {
    choices: [
      { value: "delegation" },
      { value: "questions" },
      { value: "both" },
    ],
    name: "direction",
    required: true,
  },
  {
    choices: [
      { value: "progress" },
      { value: "decisions" },
      { value: "risks" },
    ],
    name: "signals",
  },
  {
    choices: [{ value: "week" }, { value: "cycle" }, { value: "later" }],
    name: "timing",
    required: true,
  },
] as const;
function QuestionnaireStandalone() {
  return (
    <Example title="Standalone" containerClassName="md:col-span-2">
      <Questionnaire
        className="mx-auto max-w-lg"
        defaultItem="direction"
        items={questionnaireItems}
        shortcuts="letters"
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        <QuestionnaireQuestions />
        <QuestionnaireNavigation />
      </Questionnaire>
    </Example>
  );
}
function QuestionnaireQuestions() {
  return (
    <>
      <QuestionnaireItem name="direction" required>
        <QuestionnaireTitle>What should we prototype next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose one direction or write another answer.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delegation">
            <span className="font-medium">Sub-agent delegation</span>
            <QuestionnaireChoiceDescription>
              Show when work is delegated and what comes back.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="questions">
            <span className="font-medium">Question prompts</span>
            <QuestionnaireChoiceDescription>
              Show choices while the agent waits for input.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            <span className="font-medium">Both together</span>
            <QuestionnaireChoiceDescription>
              Explore one unified interaction pattern.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="Another direction"
            placeholder="Type another direction…"
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="signals" multiple>
        <QuestionnaireTitle>
          What should every progress update include?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Select all that apply, or skip this question.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="progress">Progress</QuestionnaireChoice>
          <QuestionnaireChoice value="decisions">Decisions</QuestionnaireChoice>
          <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="timing" required>
        <QuestionnaireTitle>When should this be revisited?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose when this should be revisited.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="week">This week</QuestionnaireChoice>
          <QuestionnaireChoice value="cycle">Next cycle</QuestionnaireChoice>
          <QuestionnaireChoice value="later">Revisit later</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
    </>
  );
}
function QuestionnaireNavigation() {
  return (
    <QuestionnaireActions className="w-full">
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext>Next</QuestionnaireNext>
      <QuestionnaireSubmit>Save answers</QuestionnaireSubmit>
    </QuestionnaireActions>
  );
}
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const values = {
    direction: formData.get("direction"),
    signals: formData.getAll("signals"),
    timing: formData.get("timing"),
  };
  toast.add({
    title: "Questionnaire submitted",
    description: `Direction: ${values.direction ?? "None"} · Progress signals: ${values.signals.join(", ") || "None"} · Timing: ${values.timing ?? "None"}`,
  });
}
