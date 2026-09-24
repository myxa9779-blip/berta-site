import configPromise from "@payload-config";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import { deliverLeadToCRM } from "@/lib/crm";
import { leadSchema } from "@/lib/leadSchema";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Проверьте заполнение формы", issues: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const payload = await getPayload({ config: configPromise });
    const settings = await payload.findGlobal({ slug: "site-settings", depth: 0 });
    const crmConfiguration = {
      enabled: settings.crm?.enabled ?? false,
      mode: settings.crm?.mode === "api" ? "api" as const : "webhook" as const,
      endpoint: settings.crm?.endpoint,
    };
    const lead = await payload.create({
      collection: "leads",
      data: {
        name: result.data.name,
        phone: result.data.phone,
        city: result.data.city,
        sourcePage: result.data.sourcePage,
        status: "new",
        crmStatus: crmConfiguration.enabled ? "pending" : "disabled",
        crmAttempts: 0,
      },
    });

    const crmResult = await deliverLeadToCRM(crmConfiguration, {
      leadId: lead.id,
      fullName: result.data.name,
      phone: result.data.phone,
      city: result.data.city,
      sourcePage: result.data.sourcePage,
      createdAt: lead.createdAt,
    });

    await payload.update({
      collection: "leads",
      id: lead.id,
      data: {
        crmStatus: crmResult.status,
        crmAttempts: crmResult.attempts,
        crmResponse: crmResult.response,
        crmUpdatedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, message: "Заявка принята" });
  } catch (error) {
    console.error("[BERTA lead error]", error);
    return NextResponse.json(
      { success: false, message: "Не удалось обработать заявку" },
      { status: 500 },
    );
  }
}
