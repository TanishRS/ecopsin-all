import React, { useState, useEffect } from "react";

// ── Ecospin Owner Dashboard ───────────────────────────────────────
// One API, four actions. Big touch targets, color + icon coded,
// trilingual (Marathi / Hindi / English). No login (v1 — add passcode
// before real handover).

const API = "https://n8n-service-wvij.onrender.com/webhook/ecospin-api";

type Lang = "mr" | "hi" | "en";
type Tab = "orders" | "rates";
type SaveState = "idle" | "saving" | "saved";

type Translation = {
  orders: string;
  rates: string;
  name: string;
  phone: string;
  item: string;
  pickup: string;
  tapStatus: string;
  standard: string;
  sameday: string;
  save: string;
  saving: string;
  saved: string;
  edit: string;
  loading: string;
  empty: string;
  retry: string;
  error: string;
  confirmed: string;
  ready: string;
  delivered: string;
  [key: string]: string;
};

type Order = {
  row_number: number;
  customer_name: string;
  phone: string;
  item: string;
  service: string;
  pickup_date: string;
  status?: string;
  outlet?: string;
};

type Rate = {
  row_number: number;
  item: string;
  standard_price: number;
  same_day_price: number;
};

// Status pipeline: collected → in_transit → processing → ready → delivered
const STATUS_FLOW = ["collected", "in_transit", "processing", "ready", "delivered"];

const STATUS_META: Record<string, { color: string; bg: string; icon: string }> = {
  collected:  { color: "#2563eb", bg: "#dbeafe", icon: "📥" },
  in_transit: { color: "#7c3aed", bg: "#ede9fe", icon: "🚚" },
  processing: { color: "#d97706", bg: "#fef3c7", icon: "🌀" },
  ready:      { color: "#0891b2", bg: "#cffafe", icon: "✅" },
  delivered:  { color: "#059669", bg: "#d1fae5", icon: "📦" },
};

// All UI text in 3 languages
const T: Record<Lang, Translation> = {
  en: {
    orders: "Orders", rates: "Rates",
    name: "Name", phone: "Phone", item: "Items", pickup: "Pickup",
    tapStatus: "Tap status to change",
    standard: "Standard (3 days)", sameday: "Same-day (2×)",
    save: "Save", saving: "Saving…", saved: "Saved",
    edit: "Edit price", loading: "Loading…",
    empty: "No orders yet", retry: "Try again", error: "Could not load. Check connection.",
    confirmed: "Received", ready: "Ready", delivered: "Delivered",
  },
  hi: {
    orders: "ऑर्डर", rates: "दरें",
    name: "नाम", phone: "फ़ोन", item: "कपड़े", pickup: "पिकअप",
    tapStatus: "स्थिति बदलने के लिए टैप करें",
    standard: "सामान्य (3 दिन)", sameday: "उसी दिन (2×)",
    save: "सेव करें", saving: "सेव हो रहा…", saved: "सेव हो गया",
    edit: "दाम बदलें", loading: "लोड हो रहा…",
    empty: "अभी कोई ऑर्डर नहीं", retry: "फिर कोशिश करें", error: "लोड नहीं हुआ। कनेक्शन जांचें।",
    confirmed: "मिल गया", ready: "तैयार", delivered: "डिलीवर",
  },
  mr: {
    orders: "ऑर्डर", rates: "दर",
    name: "नाव", phone: "फोन", item: "कपडे", pickup: "पिकअप",
    tapStatus: "स्थिती बदलण्यासाठी टॅप करा",
    standard: "सामान्य (3 दिवस)", sameday: "त्याच दिवशी (2×)",
    save: "सेव्ह करा", saving: "सेव्ह होत आहे…", saved: "सेव्ह झाले",
    edit: "किंमत बदला", loading: "लोड होत आहे…",
    empty: "अजून ऑर्डर नाही", retry: "पुन्हा प्रयत्न करा", error: "लोड झाले नाही. कनेक्शन तपासा.",
    confirmed: "मिळाले", ready: "तयार", delivered: "डिलिव्हर",
  },
};

async function callApi(body: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("api");
  return res.json();
}

export default function EcospinDashboard() {
  const [lang, setLang] = useState<Lang>("mr");
  const [tab, setTab] = useState<Tab>("orders");
  const t = T[lang];

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div style={S.brand}>
          <span style={S.logoDot} /> Ecospin
        </div>
        <div style={S.langRow}>
          {([["mr", "मराठी"], ["hi", "हिंदी"], ["en", "EN"]] as [Lang, string][]).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setLang(k)}
              style={{ ...S.langBtn, ...(lang === k ? S.langBtnActive : {}) }}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <nav style={S.tabs}>
        <button
          onClick={() => setTab("orders")}
          style={{ ...S.tab, ...(tab === "orders" ? S.tabActive : {}) }}
        >
          <span style={S.tabIcon}>📋</span> {t.orders}
        </button>
        <button
          onClick={() => setTab("rates")}
          style={{ ...S.tab, ...(tab === "rates" ? S.tabActive : {}) }}
        >
          <span style={S.tabIcon}>💰</span> {t.rates}
        </button>
      </nav>

      <main style={S.main}>
        {tab === "orders" ? <Orders t={t} /> : <Rates t={t} />}
      </main>
    </div>
  );
}

function Orders({ t }: { t: Translation }) {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const [busy, setBusy] = useState<number | null>(null);

  const OUTLET = new URLSearchParams(window.location.search).get("outlet");
  const isCPU = OUTLET === null || OUTLET === "Thane"; // full 5-stage control
  const OUTLET_ALLOWED: Record<string, string> = { collected: "in_transit", ready: "delivered" };

  const load = async () => {
    setErr(false);
    setOrders(null);
    try {
      const data = await callApi({ action: "orders_read", ...(OUTLET ? { outlet: OUTLET } : {}) });
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setErr(true);
    }
  };

  useEffect(() => { load(); }, []);

  const cycleStatus = async (order: Order) => {
    const cur = (order.status || "collected").toLowerCase();
    const idx = STATUS_FLOW.indexOf(cur);
    let next: string;
    if (isCPU) {
      next = STATUS_FLOW[(idx + 1) % STATUS_FLOW.length];
    } else {
      next = OUTLET_ALLOWED[cur];
      if (next === undefined) return;
    }
    setBusy(order.row_number);
    setOrders((prev) =>
      prev
        ? prev.map((o) =>
            o.row_number === order.row_number ? { ...o, status: next } : o
          )
        : prev
    );
    try {
      await callApi({
        action: "status_update",
        row_number: order.row_number,
        status: next,
      });
    } catch {
      load();
    } finally {
      setBusy(null);
    }
  };

  if (err) return <ErrorState t={t} onRetry={load} />;
  if (orders === null) return <Loading t={t} />;
  if (orders.length === 0) return <Empty t={t} />;

  return (
    <div style={S.cardGrid}>
      {orders.map((o) => {
        const st = (o.status || "collected").toLowerCase();
        const meta = STATUS_META[st] || STATUS_META.collected;
        const canAdvance = isCPU || !!OUTLET_ALLOWED[st];
        return (
          <div key={o.row_number} style={S.orderCard}>
            <div style={S.orderName}>{o.customer_name}</div>
            {isCPU && o.outlet && <div style={S.orderLine}><span style={S.muted}>Outlet</span> {o.outlet}</div>}
            <div style={S.orderLine}><span style={S.muted}>{t.phone}</span> {o.phone}</div>
            <div style={S.orderLine}><span style={S.muted}>{t.item}</span> {o.item} · {o.service}</div>
            <div style={S.orderLine}><span style={S.muted}>{t.pickup}</span> {o.pickup_date}</div>
            {canAdvance ? (
              <button
                onClick={() => cycleStatus(o)}
                disabled={busy === o.row_number}
                style={{ ...S.statusBtn, background: meta.bg, color: meta.color }}
              >
                <span style={S.statusIcon}>{meta.icon}</span>
                {t[st] || st}
                {busy === o.row_number && <span style={S.spin}> …</span>}
              </button>
            ) : (
              <div style={{ ...S.statusBtn, background: meta.bg, color: meta.color }}>
                <span style={S.statusIcon}>{meta.icon}</span>
                {t[st] || st}
              </div>
            )}
            {canAdvance && <div style={S.tapHint}>{t.tapStatus}</div>}
          </div>
        );
      })}
    </div>
  );
}

function Rates({ t }: { t: Translation }) {
  const [rates, setRates] = useState<Rate[] | null>(null);
  const [err, setErr] = useState<boolean>(false);

  const load = async () => {
    setErr(false);
    setRates(null);
    try {
      const data = await callApi({ action: "rates_read" });
      setRates(Array.isArray(data) ? data : []);
    } catch {
      setErr(true);
    }
  };

  useEffect(() => { load(); }, []);

  if (err) return <ErrorState t={t} onRetry={load} />;
  if (rates === null) return <Loading t={t} />;

  return (
    <div style={S.cardGrid}>
      {rates.map((r) => (
        <RateCard key={r.row_number} rate={r} t={t} />
      ))}
    </div>
  );
}

function RateCard({ rate, t }: { rate: Rate; t: Translation }) {
  const [std, setStd] = useState<string | number>(rate.standard_price);
  const [same, setSame] = useState<string | number>(rate.same_day_price);
  const [state, setState] = useState<SaveState>("idle");

  const dirty =
    String(std) !== String(rate.standard_price) ||
    String(same) !== String(rate.same_day_price);

  const save = async () => {
    setState("saving");
    try {
      await callApi({
        action: "rates_write",
        item: rate.item,
        standard_price: Number(std),
        same_day_price: Number(same),
      });
      setState("saved");
      setTimeout(() => setState("idle"), 1500);
    } catch {
      setState("idle");
    }
  };

  return (
    <div style={S.rateCard}>
      <div style={S.rateName}>{rate.item}</div>

      <label style={S.rateField}>
        <span style={S.muted}>{t.standard}</span>
        <div style={S.priceRow}>
          <span style={S.rupee}>₹</span>
          <input
            type="number"
            inputMode="numeric"
            value={std}
            onChange={(e) => { setStd(e.target.value); setSame(Number(e.target.value) * 2); }}
            style={S.priceInput}
          />
        </div>
      </label>

      <label style={S.rateField}>
        <span style={S.muted}>{t.sameday}</span>
        <div style={S.priceRow}>
          <span style={S.rupee}>₹</span>
          <input
            type="number"
            inputMode="numeric"
            value={same}
            onChange={(e) => setSame(e.target.value)}
            style={S.priceInput}
          />
        </div>
      </label>

      <button
        onClick={save}
        disabled={!dirty || state === "saving"}
        style={{
          ...S.saveBtn,
          ...(state === "saved" ? S.saveBtnDone : {}),
          ...(!dirty && state === "idle" ? S.saveBtnDisabled : {}),
        }}
      >
        {state === "saving" ? t.saving : state === "saved" ? "✓ " + t.saved : t.save}
      </button>
    </div>
  );
}

function Loading({ t }: { t: Translation }) {
  return <div style={S.center}><div style={S.bigEmoji}>⏳</div>{t.loading}</div>;
}
function Empty({ t }: { t: Translation }) {
  return <div style={S.center}><div style={S.bigEmoji}>🧺</div>{t.empty}</div>;
}
function ErrorState({ t, onRetry }: { t: Translation; onRetry: () => void }) {
  return (
    <div style={S.center}>
      <div style={S.bigEmoji}>📡</div>
      <div style={{ marginBottom: 16 }}>{t.error}</div>
      <button onClick={onRetry} style={S.retryBtn}>{t.retry}</button>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────
const ECO = "#6d28d9";
const ECO_LT = "#f1e9fd";
const S: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    maxWidth: 720, margin: "0 auto", minHeight: "100vh",
    background: "#fafaf8", color: "#1a1a1a",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 20px", background: ECO, color: "#fff",
    position: "sticky", top: 0, zIndex: 10,
  },
  brand: { fontSize: 22, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 },
  logoDot: { width: 14, height: 14, borderRadius: "50%", background: "#c4b5fd", display: "inline-block" },
  langRow: { display: "flex", gap: 4 },
  langBtn: {
    border: "none", background: "rgba(255,255,255,0.15)", color: "#fff",
    padding: "8px 12px", borderRadius: 8, fontSize: 15, cursor: "pointer", fontWeight: 600,
  },
  langBtnActive: { background: "#fff", color: ECO },

  tabs: { display: "flex", gap: 8, padding: "12px 16px", background: "#fff", borderBottom: "1px solid #eee" },
  tab: {
    flex: 1, border: "none", background: ECO_LT, color: ECO,
    padding: "16px", borderRadius: 12, fontSize: 18, fontWeight: 700,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  },
  tabActive: { background: ECO, color: "#fff" },
  tabIcon: { fontSize: 22 },

  main: { padding: 16 },
  cardGrid: { display: "grid", gap: 14 },

  orderCard: {
    background: "#fff", borderRadius: 16, padding: 18,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0",
  },
  orderName: { fontSize: 20, fontWeight: 700, marginBottom: 8 },
  orderLine: { fontSize: 16, margin: "4px 0" },
  muted: { color: "#888", marginRight: 6 },
  statusBtn: {
    width: "100%", marginTop: 14, border: "none", borderRadius: 12,
    padding: "16px", fontSize: 19, fontWeight: 700, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  },
  statusIcon: { fontSize: 22 },
  spin: { opacity: 0.6 },
  tapHint: { textAlign: "center", fontSize: 13, color: "#aaa", marginTop: 6 },

  rateCard: {
    background: "#fff", borderRadius: 16, padding: 18,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0",
  },
  rateName: { fontSize: 20, fontWeight: 700, marginBottom: 12 },
  rateField: { display: "block", marginBottom: 12 },
  priceRow: { display: "flex", alignItems: "center", gap: 6, marginTop: 4 },
  rupee: { fontSize: 22, fontWeight: 700, color: ECO },
  priceInput: {
    flex: 1, fontSize: 22, padding: "12px 14px", borderRadius: 10,
    border: "2px solid #e0e0e0", width: "100%", boxSizing: "border-box",
  },
  saveBtn: {
    width: "100%", marginTop: 6, border: "none", borderRadius: 12,
    padding: "16px", fontSize: 18, fontWeight: 700, cursor: "pointer",
    background: ECO, color: "#fff",
  },
  saveBtnDone: { background: "#059669" },
  saveBtnDisabled: { background: "#cfcfcf", cursor: "default" },

  center: { textAlign: "center", padding: "60px 20px", fontSize: 18, color: "#666" },
  bigEmoji: { fontSize: 48, marginBottom: 12 },
  retryBtn: {
    border: "none", background: ECO, color: "#fff", padding: "14px 28px",
    borderRadius: 12, fontSize: 17, fontWeight: 700, cursor: "pointer",
  },
};
