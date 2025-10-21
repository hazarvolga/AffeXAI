"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AssessmentPage;
const assessment_data_1 = require("@/lib/assessment-data");
const navigation_1 = require("next/navigation");
const breadcrumb_1 = require("@/components/ui/breadcrumb");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const link_1 = __importDefault(require("next/link"));
const radio_group_1 = require("@/components/ui/radio-group");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const events_data_1 = require("@/lib/events-data");
const QuestionCard = ({ question, questionNumber }) => {
    return (<card_1.Card>
            <card_1.CardHeader>
                <card_1.CardTitle>Soru {questionNumber}: {question.text}</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
                {question.type === 'multiple-choice' && question.options && (<radio_group_1.RadioGroup name={`question-${question.id}`}>
                        {question.options.map(option => (<div key={option.id} className="flex items-center space-x-2">
                                <radio_group_1.RadioGroupItem value={option.id} id={`q-${question.id}-opt-${option.id}`}/>
                                <label_1.Label htmlFor={`q-${question.id}-opt-${option.id}`}>{option.text}</label_1.Label>
                            </div>))}
                    </radio_group_1.RadioGroup>)}
                {question.type === 'text' && (<textarea_1.Textarea name={`question-${question.id}`} placeholder="Cevabınızı buraya yazınız..."/>)}
            </card_1.CardContent>
        </card_1.Card>);
};
function AssessmentPage({ params }) {
    const assessment = assessment_data_1.assessments.find(a => a.id === params.assessmentId);
    if (!assessment) {
        (0, navigation_1.notFound)();
    }
    const event = events_data_1.events.find(e => e.id === assessment.eventId);
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would process the form data here.
        alert('Değerlendirme gönderildi! (Bu bir demo mesajıdır.)');
    };
    return (<div className="flex-1 space-y-6">
             <breadcrumb_1.Breadcrumb>
                <breadcrumb_1.BreadcrumbList>
                    <breadcrumb_1.BreadcrumbItem>
                        <breadcrumb_1.BreadcrumbLink asChild><link_1.default href="/portal/dashboard">Portal</link_1.default></breadcrumb_1.BreadcrumbLink>
                    </breadcrumb_1.BreadcrumbItem>
                     <breadcrumb_1.BreadcrumbSeparator />
                     <breadcrumb_1.BreadcrumbItem>
                        <breadcrumb_1.BreadcrumbLink asChild><link_1.default href="/portal/events">Etkinlikler</link_1.default></breadcrumb_1.BreadcrumbLink>
                    </breadcrumb_1.BreadcrumbItem>
                    {event && (<>
                         <breadcrumb_1.BreadcrumbSeparator />
                         <breadcrumb_1.BreadcrumbItem>
                            <breadcrumb_1.BreadcrumbLink asChild><link_1.default href={`/portal/events/${event.id}`}>{event.title}</link_1.default></breadcrumb_1.BreadcrumbLink>
                        </breadcrumb_1.BreadcrumbItem>
                        </>)}
                    <breadcrumb_1.BreadcrumbSeparator />
                    <breadcrumb_1.BreadcrumbItem>
                        <breadcrumb_1.BreadcrumbPage>{assessment.title}</breadcrumb_1.BreadcrumbPage>
                    </breadcrumb_1.BreadcrumbItem>
                </breadcrumb_1.BreadcrumbList>
            </breadcrumb_1.Breadcrumb>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <header>
                    <h1 className="text-3xl font-bold tracking-tight">{assessment.title}</h1>
                    <p className="text-lg text-muted-foreground mt-1">
                        {assessment.type === 'quiz' ? 'Lütfen aşağıdaki soruları cevaplayın.' : 'Lütfen bu anketi doldurun.'}
                    </p>
                </header>

                {assessment.questions.map((q, index) => (<QuestionCard key={q.id} question={q} questionNumber={index + 1}/>))}

                <div className="flex justify-end">
                    <button_1.Button type="submit" size="lg">Cevapları Gönder</button_1.Button>
                </div>
            </form>
        </div>);
}
//# sourceMappingURL=page.js.map