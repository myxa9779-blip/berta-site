export interface CRMLeadPayload {
  leadId: string | number;
  fullName: string;
  phone: string;
  city: string;
  sourcePage: string;
  createdAt: string;
}

export interface CRMConfiguration {
  enabled: boolean;
  mode: "webhook" | "api";
  endpoint?: string | null;
}

export interface CRMDeliveryResult {
  status: "disabled" | "sent" | "failed";
  attempts: number;
  response: string;
}

export async function deliverLeadToCRM(
  configuration: CRMConfiguration,
  lead: CRMLeadPayload,
): Promise<CRMDeliveryResult> {
  if (!configuration.enabled) {
    return { status: "disabled", attempts: 0, response: "CRM отключена в CMS" };
  }

  const endpoint =
    configuration.endpoint ||
    (configuration.mode === "api"
      ? process.env.CRM_API_URL
      : process.env.CRM_WEBHOOK_URL);

  if (!endpoint) {
    return { status: "failed", attempts: 0, response: "Не указан адрес CRM" };
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (configuration.mode === "api" && process.env.CRM_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.CRM_API_TOKEN}`;
  }
  if (configuration.mode === "webhook" && process.env.CRM_WEBHOOK_SECRET) {
    headers["X-Webhook-Secret"] = process.env.CRM_WEBHOOK_SECRET;
  }

  let lastResponse = "";
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });
      lastResponse = `${response.status} ${(await response.text()).slice(0, 1500)}`.trim();
      if (response.ok) {
        return { status: "sent", attempts: attempt, response: lastResponse };
      }
    } catch (error) {
      lastResponse = error instanceof Error ? error.message : "Неизвестная ошибка CRM";
    }
  }

  return { status: "failed", attempts: 2, response: lastResponse };
}
