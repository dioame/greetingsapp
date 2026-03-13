import Link from "next/link";

const PAYPAL_LINK = process.env.NEXT_PUBLIC_PAYPAL_DONATE_URL || "https://paypal.me/dioamejaderendon";

export default function DonatePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0c0a0f 0%, #1a1520 50%, #0c0a0f 100%)",
        padding: "2rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-block",
            color: "var(--muted)",
            marginBottom: "2rem",
            fontSize: "0.9rem",
          }}
        >
          ← Back to home
        </Link>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 600,
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #f5f0f7, #c77dff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Donate
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "2rem", lineHeight: 1.6 }}>
          Thank you for supporting Awesome Greetings By Dioame. Your donation helps keep the app free and adds new designs.
        </p>

        {/* PayPal */}
        <section
          style={{
            background: "var(--surface)",
            borderRadius: "12px",
            border: "1px solid var(--accent-dim)",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text)",
              marginBottom: "0.5rem",
            }}
          >
            PayPal
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Send a one-time or recurring donation via PayPal.
          </p>
          <a
            href={PAYPAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #003087, #009cde)",
              color: "#fff",
              fontWeight: 500,
            }}
          >
            Donate with PayPal
          </a>
        </section>

        {/* GCash */}
        <section
          style={{
            background: "var(--surface)",
            borderRadius: "12px",
            border: "1px solid var(--accent-dim)",
            padding: "1.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text)",
              marginBottom: "0.5rem",
            }}
          >
            GCash
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Scan the QR code below to send via GCash.
          </p>
          <div
            style={{
              width: "200px",
              height: "200px",
              margin: "0 auto",
              background: "#fff",
              borderRadius: "12px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="/gcash-qr.png"
              alt="GCash / InstaPay QR code for donations"
              width={176}
              height={176}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </div>
        </section>

        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "2rem", textAlign: "center" }}>
          Questions? Contact{" "}
          <a href="mailto:dioamejade@gmail.com" style={{ color: "var(--accent)" }}>
            dioamejade@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
