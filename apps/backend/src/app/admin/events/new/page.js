"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewEventPage;
const event_form_1 = require("@/components/admin/event-form");
function NewEventPage() {
    return (<div>
             <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Yeni Etkinlik Oluştur</h1>
                <p className="text-muted-foreground">Etkinliğinizin tüm detaylarını bu form üzerinden yapılandırın.</p>
            </div>
            <event_form_1.EventForm />
        </div>);
}
//# sourceMappingURL=page.js.map