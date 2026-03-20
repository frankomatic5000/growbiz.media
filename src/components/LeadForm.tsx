"use client";

import { useState } from "react";

interface LeadFormProps {
  serviceType: string;
  source: string;
}

export function LeadForm({ serviceType, source }: LeadFormProps) {
  const [formData, setFormData] = useState({
    prospect_name: "",
    contact_method: "email",
    contact_value: "",
    service_interest: serviceType,
    budget_hint: "not_discussed",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source,
          urgency_signals: [],
          captured_by: "website_form",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-emerald-800 bg-emerald-950/30 p-6 text-center">
        <h3 className="mb-2 text-xl font-semibold text-emerald-400">
          Obrigado pelo contato!
        </h3>
        <p className="text-neutral-300">
          Recebemos sua mensagem e vamos retornar em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-300">
          Nome completo
        </label>
        <input
          type="text"
          required
          value={formData.prospect_name}
          onChange={(e) =>
            setFormData({ ...formData, prospect_name: e.target.value })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
          placeholder="Seu nome"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            Como prefere ser contactado?
          </label>
          <select
            value={formData.contact_method}
            onChange={(e) =>
              setFormData({ ...formData, contact_method: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="email">Email</option>
            <option value="phone_number">Telefone</option>
            <option value="instagram_handle">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            Contato
          </label>
          <input
            type="text"
            required
            value={formData.contact_value}
            onChange={(e) =>
              setFormData({ ...formData, contact_value: e.target.value })
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-300">
          Orçamento estimado
        </label>
        <select
          value={formData.budget_hint}
          onChange={(e) =>
            setFormData({ ...formData, budget_hint: e.target.value })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
        >
          <option value="not_discussed">Prefiro não informar</option>
          <option value="under_500">Até $500</option>
          <option value="500_2000">$500 - $2.000</option>
          <option value="2000_5000">$2.000 - $5.000</option>
          <option value="5000_plus">Acima de $5.000</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-300">
          Mensagem
        </label>
        <textarea
          rows={4}
          value={formData.notes}
          onChange={(e) =>
            setFormData({ ...formData, notes: e.target.value })
          }
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
          placeholder="Conte-nos sobre seu projeto..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar mensagem →"}
      </button>
    </form>
  );
}
