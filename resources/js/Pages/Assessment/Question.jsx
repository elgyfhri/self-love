import { useState } from "react";
import { router } from "@inertiajs/react";
import AssessmentLayout from "@/Layouts/AssessmentLayout";

export default function Question({ assessment, questions }) {
   const [current, setCurrent] = useState(0);
const [answers, setAnswers] = useState({});

const question = questions[current];

console.log(answers);
console.log(question.id);
console.log(answers[question.id]);

    const handleAnswer = (optionId) => {
    setAnswers((prev) => ({
        ...prev,
        [question.id]: optionId,
    }));
};

    const previous = () => {
         if (current > 0) {
             setCurrent((prev) => prev - 1);
             window.scrollTo({ top: 0, behavior: "smooth" });
         }
    };

    const next = () => {

    console.log("NEXT CLICK");
    console.log(current);
    console.log(questions.length);


    if (current < questions.length - 1) {

         setCurrent((prev) => prev + 1);
         window.scrollTo({ top: 0, behavior: "smooth" });

    } else {

        console.log("SUBMIT DIPANGGIL");
        submitAssessment();

    }

};

    const submitAssessment = () => {

    console.log("DATA SUBMIT");
    console.log(answers);


    router.post(
        route(
            "assessments.submit",
            assessment.code
        ),
        {
            answers: answers,
        },
        {
            onStart: () => {
                console.log("REQUEST DIMULAI");
            },

            onSuccess: (page) => {
                console.log("SUCCESS");
                console.log(page);
            },

            onError: (errors) => {
                console.log("ERROR");
                console.log(errors);
            },

            onFinish: () => {
                console.log("REQUEST SELESAI");
            }
        }
    );

};

    return (
        <AssessmentLayout>
            <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow">

                <h1 className="mb-6 text-center text-3xl font-bold">
                    {assessment.name}
                </h1>

                {/* Progress */}
                <div className="mb-8">
                    <p className="mb-2 text-sm text-gray-500">
                        Question {current + 1} of {questions.length}
                    </p>

                    <div className="h-2 rounded-full bg-gray-200">
                        <div
                            className="h-2 rounded-full bg-violet-600 transition-all"
                            style={{
                                width: `${((current + 1) / questions.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Question */}
                <h2 className="mb-8 text-2xl font-semibold">
                    {question.question}
                </h2>

                {/* Options */}
                <div className="space-y-4">
                    {question.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            className={`w-full rounded-xl border p-4 text-left transition ${
                                answers[question.id] == option.id
                                    ? "border-violet-600 bg-violet-100"
                                    : "hover:bg-violet-50"
                            }`}
                        >
                            {option.option_text}
                        </button>
                    ))}
                </div>

                {/* Navigation */}
                <div className="mt-10 flex justify-between">

                    <button
                        onClick={previous}
                        disabled={current === 0}
                        className="rounded-xl border px-6 py-3 disabled:opacity-40"
                    >
                        Previous
                    </button>

                  <button
    onClick={next}
    disabled={answers[question.id] === undefined}
    className="rounded-xl bg-violet-600 px-6 py-3 text-white disabled:opacity-40"
>
    {current === questions.length - 1
        ? "Submit Assessment"
        : "Next"}
</button>

                </div>

            </div>
        </AssessmentLayout>
    );
}