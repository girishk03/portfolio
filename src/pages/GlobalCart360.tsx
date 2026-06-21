import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Monitor, Server, Database, CreditCard, Layout, Shield, ShoppingCart, Code, Github } from "lucide-react";
import { ScrollLinkedText } from "@/components/ScrollLinkedText";

type SectionHeaderProps = {
  number: string;
  title: string;
  subtitle?: string;
};

const SectionHeader = ({ number, title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-3">
        <span className="font-mono text-xs text-muted-foreground tracking-wider">
          {number}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <ScrollLinkedText as="h2" className="text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </ScrollLinkedText>
      {subtitle && <p className="mt-3 text-muted-foreground text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
};

type ArchitectureCardProps = {
  title: string;
  icon: JSX.Element;
  items: string[];
  accentColor: "primary" | "accent" | "terminal";
};

const ArchitectureCard = ({ title, icon, items, accentColor }: ArchitectureCardProps) => {
  const accent =
    accentColor === "primary"
      ? "text-primary"
      : accentColor === "accent"
        ? "text-accent"
        : "text-terminal";
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className={`mb-4 ${accent}`}>{icon}</div>
      <ScrollLinkedText as="h3" className="text-lg font-semibold mb-3">
        {title}
      </ScrollLinkedText>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

type FlowStepProps = {
  number: number;
  title: string;
  description: string;
  isLast: boolean;
};

const FlowStep = ({ number, title, description, isLast }: FlowStepProps) => {
  return (
    <div className="relative flex gap-4 pb-8">
      {!isLast && <div className="absolute left-5 top-10 bottom-0 w-px bg-border" />}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-sm text-primary">
          {number}
        </div>
      </div>
      <div className="pt-1">
        <ScrollLinkedText as="h4" className="text-lg font-semibold">
          {title}
        </ScrollLinkedText>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

type EvidenceImageProps = {
  src: string;
  alt: string;
  caption: string;
  category: string;
};

const EvidenceImage = ({ src, alt, caption, category }: EvidenceImageProps) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card">
        <div className="absolute top-3 left-3 z-10">
          <span className="font-mono text-xs bg-background/90 backdrop-blur-sm text-muted-foreground px-2 py-1 rounded border border-border">
            {category}
          </span>
        </div>
        <img
          src={src}
          alt={alt}
          className="w-full aspect-video object-cover object-top"
          loading="lazy"
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground font-mono">{caption}</p>
    </div>
  );
};

type ObjectiveItemProps = {
  text: string;
  index: number;
};

const ObjectiveItem = ({ text, index }: ObjectiveItemProps) => {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
      <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center font-mono text-xs text-muted-foreground flex-shrink-0">
        {String(index + 1).padStart(2, "0")}
      </div>
      <p className="text-foreground">{text}</p>
    </div>
  );
};

type LimitationItemProps = {
  text: string;
};

const LimitationItem = ({ text }: LimitationItemProps) => {
  return (
    <div className="p-5 rounded-xl border border-border bg-card">
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
};

type DesignDecisionProps = {
  decision: string;
  reason: string;
};

const DesignDecision = ({ decision, reason }: DesignDecisionProps) => {
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <ScrollLinkedText as="h3" className="text-lg font-semibold">
        {decision}
      </ScrollLinkedText>
      <p className="text-muted-foreground mt-3">{reason}</p>
    </div>
  );
};

type LearningOutcomeProps = {
  text: string;
};

const LearningOutcome = ({ text }: LearningOutcomeProps) => {
  return (
    <div className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card">
      <span className="text-primary mt-0.5">•</span>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
};

const GlobalCart360 = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);

  const goBackToProjects = () => {
    navigate("/");
    window.setTimeout(() => {
      const projectsSection = document.getElementById("projects");
      projectsSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let lastY = window.scrollY;
    let isDown = false;

    const setDown = (next: boolean) => {
      if (next === isDown) return;
      isDown = next;
      root.classList.toggle("scrolling-down", isDown);
    };

    const onScrollDirection = () => {
      const y = window.scrollY;
      setDown(y > lastY);
      lastY = y;
    };

    onScrollDirection();
    window.addEventListener("scroll", onScrollDirection, { passive: true });

    const supportsScrollDriven =
      typeof CSS !== "undefined" &&
      typeof (CSS as unknown as { supports?: (property: string, value: string) => boolean }).supports === "function" &&
      (CSS as unknown as { supports: (property: string, value: string) => boolean }).supports(
        "animation-timeline",
        "view()"
      );

    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (supportsScrollDriven || prefersReduced) {
      return () => {
        window.removeEventListener("scroll", onScrollDirection);
      };
    }

    const textEls = Array.from(root.querySelectorAll("p, h1, h2, h3, h4, blockquote, hr")) as HTMLElement[];
    const imgEls = Array.from(root.querySelectorAll("img")) as HTMLElement[];

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;

      if (!isDown) {
        for (const el of [...textEls, ...imgEls]) {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.willChange = "auto";
        }
        return;
      }

      for (const el of textEls) {
        const rect = el.getBoundingClientRect();
        const progress = clamp01((vh - rect.top) / (vh * 0.7));
        const ty = (1 - progress) * 128;
        el.style.opacity = String(progress);
        el.style.transform = `translate3d(0, ${ty}px, 0)`;
        el.style.willChange = "opacity, transform";
      }

      for (const el of imgEls) {
        const rect = el.getBoundingClientRect();
        const progress = clamp01((vh - rect.top) / (vh * 0.5));
        const ty = (1 - progress) * 64;
        el.style.opacity = String(progress);
        el.style.transform = `translate3d(0, ${ty}px, 0)`;
        el.style.willChange = "opacity, transform";
      }
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", onScrollDirection);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
      for (const el of [...textEls, ...imgEls]) {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        el.style.removeProperty("will-change");
      }
    };
  }, []);

  const objectives = [
    "Design a scalable e-commerce backend architecture",
    "Implement secure user authentication with OTP verification",
    "Handle cart-to-order state transitions with data integrity",
    "Integrate a real payment gateway (Razorpay)",
    "Maintain clean frontend–backend separation",
    "Build comprehensive admin analytics and monitoring",
  ];

  const flowSteps = [
    { title: "User Authentication", description: "User registers/logs in → OTP verification → JWT token issued" },
    { title: "Product Discovery", description: "Product data fetched via REST APIs with filtering and search" },
    { title: "Cart Management", description: "Cart maintained on client with server synchronization" },
    { title: "Checkout Initiation", description: "Checkout triggers order creation with address validation" },
    { title: "Payment Processing", description: "Razorpay payment intent generated for transaction" },
    { title: "Order Completion", description: "Order status updated based on payment response" },
  ];

  const apiEndpoints = [
    { method: "POST", path: "/api/auth/login", purpose: "Authenticate a customer and begin the OTP/JWT flow" },
    { method: "GET", path: "/api/customer/products", purpose: "Browse and filter the product catalog" },
    { method: "PUT", path: "/api/customer/cart", purpose: "Synchronize customer cart quantities" },
    { method: "POST", path: "/api/customer/checkout/start", purpose: "Validate checkout, create an order, and reserve inventory" },
    { method: "POST", path: "/api/payments/razorpay/confirm", purpose: "Verify payment confirmation and finalize order state" },
    { method: "GET", path: "/api/admin/kpis/latest", purpose: "Return protected operational KPI data" },
  ];

  const schemaEntities = [
    { name: "dim_customer", detail: "Customer identity and geography", relation: "1 → many orders" },
    { name: "dim_product", detail: "Catalog, category, price, and cost", relation: "1 → many order items" },
    { name: "fact_orders", detail: "Order totals, status, and customer", relation: "parent of items and payments" },
    { name: "fact_order_items", detail: "Quantity, price, tax, and revenue", relation: "joins orders to products" },
    { name: "fact_payments", detail: "Provider, amount, and payment state", relation: "many payments → one order" },
    { name: "order_inventory_reservations", detail: "Reserved, consumed, or released stock", relation: "order + product lifecycle" },
  ];

  const limitations = [
    "Public Render deployment is a portfolio demo without a production SLA",
    "Razorpay live credentials and payment execution are disabled in the public demo",
    "No automated email notifications implemented",
    "UI not optimized for animations or advanced interactions",
    "Mobile responsiveness limited to core workflows",
  ];

  const designDecisions = [
    {
      decision: "REST APIs for frontend independence",
      reason: "Decoupled architecture allows independent frontend/backend development and future mobile app integration",
    },
    {
      decision: "Stateless backend for scalability",
      reason: "JWT-based authentication enables horizontal scaling without session storage dependencies",
    },
    {
      decision: "Razorpay over dummy payments",
      reason: "Payment gateway integration demonstrates external-service handling and checkout state transitions",
    },
    {
      decision: "Modular service architecture",
      reason: "Clean separation enables future microservice migration without core logic changes",
    },
  ];

  const learnings = [
    "End-to-end transaction flow design from cart to order completion",
    "Payment gateway integration challenges including webhook handling",
    "API contract discipline and version management",
    "Debugging async frontend-backend communication issues",
    "Handling partial system completeness in demo environments",
    "Building admin observability tools for business metrics",
  ];

  const customerEvidence = [
    {
      src: "/projects/globalcart-360/globalscart/01-welcome-screen.png",
      alt: "Welcome Screen",
      caption: "fig.01 — Authenticated user welcome state",
      category: "AUTH",
    },
    {
      src: "/projects/globalcart-360/globalscart/02-signup-form.png",
      alt: "Signup Form",
      caption: "fig.02 — User registration with password validation",
      category: "AUTH",
    },
    {
      src: "/projects/globalcart-360/globalscart/03-login-otp.png",
      alt: "Login OTP",
      caption: "fig.03 — OTP-based authentication flow",
      category: "AUTH",
    },
    {
      src: "/projects/globalcart-360/globalscart/04-product-listing.png",
      alt: "Product Listing",
      caption: "fig.04 — Product catalog with filtering",
      category: "SHOP",
    },
    {
      src: "/projects/globalcart-360/globalscart/06-wishlist.png",
      alt: "Wishlist",
      caption: "fig.05 — Saved items wishlist view",
      category: "SHOP",
    },
    {
      src: "/projects/globalcart-360/globalscart/08-cart.png",
      alt: "Shopping Cart",
      caption: "fig.06 — Cart state with quantity management",
      category: "CART",
    },
    {
      src: "/projects/globalcart-360/globalscart/09-checkout-top.png",
      alt: "Checkout Form",
      caption: "fig.07 — Checkout with payment & address",
      category: "CHECKOUT",
    },
    {
      src: "/projects/globalcart-360/globalscart/10-checkout-bottom.png",
      alt: "Checkout Summary",
      caption: "fig.08 — Order summary with promo code",
      category: "CHECKOUT",
    },
    {
      src: "/projects/globalcart-360/globalscart/05-orders-list.png",
      alt: "Orders List",
      caption: "fig.09 — Order history with status tracking",
      category: "ORDERS",
    },
    {
      src: "/projects/globalcart-360/globalscart/07-inbox.png",
      alt: "Inbox Notifications",
      caption: "fig.10 — Order confirmation notifications",
      category: "ORDERS",
    },
  ];

  const adminEvidence = [
    {
      src: "/projects/globalcart-360/globalscart/11-admin-login.png",
      alt: "Admin Login",
      caption: "fig.11 — Admin dashboard authentication",
      category: "ADMIN",
    },
    {
      src: "/projects/globalcart-360/globalscart/12-admin-dashboard.png",
      alt: "Admin Dashboard",
      caption: "fig.12 — KPI metrics and order monitoring",
      category: "ADMIN",
    },
    {
      src: "/projects/globalcart-360/globalscart/13-analytics.png",
      alt: "Analytics Dashboard",
      caption: "fig.13 — Revenue trends and conversion funnel",
      category: "ANALYTICS",
    },
    {
      src: "/projects/globalcart-360/globalscart/14-audit-log.png",
      alt: "Audit Log",
      caption: "fig.14 — System audit trail for order changes",
      category: "ADMIN",
    },
    {
      src: "/projects/globalcart-360/globalscart/15-journey-replay.png",
      alt: "Journey Replay",
      caption: "fig.15 — Customer session timeline analysis",
      category: "ANALYTICS",
    },
  ];

  return (
    <div ref={rootRef} className="min-h-screen bg-background globalcart360-timeline">
      <div className="fixed left-4 top-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={goBackToProjects}
          className="transition-colors"
        >
          Back
        </Button>
      </div>

      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
              GlobalScart
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              A FastAPI commerce backend demonstrating authentication, inventory reservation, transactional checkout,
              payment-state handling, PostgreSQL analytics, and operational constraints.
            </p>

            <div className="flex flex-wrap gap-2 mt-10">
              {["FastAPI", "REST API", "PostgreSQL", "Razorpay", "JWT & RBAC", "Analytics"].map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs text-muted-foreground px-3 py-1.5 rounded-full border border-border bg-transparent"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/girishk03/GlobalScart"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Code
                </a>
              </Button>

              <Button variant="outline" asChild>
                <Link to="/">Back to Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-24 space-y-28">
        <section>
          <SectionHeader number="01" title="Problem Statement" subtitle="Identifying the technical gap" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <p className="text-lg text-foreground leading-relaxed">
                Many educational e-commerce applications simplify transaction handling, inventory consistency, and
                payment workflows. GlobalScart was built to explore the backend coordination these workflows require.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                <strong className="text-foreground">GlobalScart</strong> was built to simulate a real-world e-commerce
                transaction pipeline, focusing on <span className="text-primary">data integrity</span>,
                <span className="text-accent"> API-driven architecture</span>, and
                <span className="text-terminal"> payment flow design</span> rather than visual polish.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader number="02" title="System Objectives" subtitle="Engineering goals, not features" />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {objectives.map((objective, index) => (
              <ObjectiveItem key={index} text={objective} index={index} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader number="03" title="System Architecture" subtitle="Implementation-specific request and data path" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ArchitectureCard
              title="Browser Client"
              icon={<Monitor className="w-5 h-5" />}
              items={["Static shop and admin interfaces", "REST API consumption", "Client-side form validation", "Bearer-token requests"]}
              accentColor="primary"
            />
            <ArchitectureCard
              title="FastAPI Application"
              icon={<Server className="w-5 h-5" />}
              items={[
                "Customer and admin routers",
                "JWT authentication and RBAC",
                "Validation and domain orchestration",
                "Request logging and error handling",
              ]}
              accentColor="accent"
            />
            <ArchitectureCard
              title="Commerce Services"
              icon={<ShoppingCart className="w-5 h-5" />}
              items={["Cart and checkout workflows", "Inventory reservation lifecycle", "Order and payment transitions", "Cancellation and stock release"]}
              accentColor="primary"
            />
            <ArchitectureCard
              title="PostgreSQL"
              icon={<Database className="w-5 h-5" />}
              items={["Customer and product dimensions", "Order, item, and payment facts", "Inventory reservations", "Audit and funnel events"]}
              accentColor="terminal"
            />
            <ArchitectureCard
              title="Razorpay Boundary"
              icon={<CreditCard className="w-5 h-5" />}
              items={["Provider order creation", "Signature confirmation", "Webhook endpoint", "Test-mode public integration"]}
              accentColor="primary"
            />
            <ArchitectureCard
              title="Analytics Layer"
              icon={<Layout className="w-5 h-5" />}
              items={["KPI snapshots and BI marts", "Revenue and funnel analysis", "Customer journey events", "Protected admin endpoints"]}
              accentColor="accent"
            />
          </div>
          <div className="mt-6 rounded-xl border border-border bg-card p-5 font-mono text-xs md:text-sm text-muted-foreground overflow-x-auto">
            <span className="text-primary">Browser</span> → <span className="text-accent">FastAPI routers</span> → JWT/RBAC → Commerce services → <span className="text-terminal">PostgreSQL</span> → Analytics marts
          </div>
        </section>

        <section>
          <SectionHeader number="04" title="Database Design" subtitle="Core transactional relationships" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemaEntities.map((entity) => (
              <div key={entity.name} className="rounded-xl border border-border bg-card p-5">
                <code className="text-sm text-primary">{entity.name}</code>
                <p className="mt-3 text-sm text-foreground">{entity.detail}</p>
                <p className="mt-2 text-xs text-muted-foreground font-mono">{entity.relation}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-border bg-card p-5 text-center font-mono text-xs md:text-sm text-muted-foreground overflow-x-auto">
            dim_customer → fact_orders → fact_order_items ← dim_product<br />
            fact_orders → fact_payments · fact_orders → order_inventory_reservations ← dim_product
          </div>
        </section>

        <section>
          <SectionHeader number="05" title="API Design" subtitle="Representative endpoints verified against the FastAPI routers" />
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Method</th>
                  <th className="px-5 py-4">Endpoint</th>
                  <th className="px-5 py-4">Responsibility</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((endpoint) => (
                  <tr key={`${endpoint.method}-${endpoint.path}`} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-mono text-accent">{endpoint.method}</td>
                    <td className="px-5 py-4"><code className="text-primary">{endpoint.path}</code></td>
                    <td className="px-5 py-4 text-muted-foreground">{endpoint.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <SectionHeader number="06" title="Data & Control Flow" subtitle="Transaction pipeline step-by-step" />
          <div className="max-w-2xl">
            {flowSteps.map((step, index) => (
              <FlowStep
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                isLast={index === flowSteps.length - 1}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader number="07" title="Checkout State Machine" subtitle="Order, payment, and inventory transitions" />
          <div className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-start gap-4 mb-4">
                <CreditCard className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Test Mode Integration</h3>
                  <p className="text-muted-foreground mt-2">
                    Razorpay is integrated in test mode to demonstrate payment intent creation, transaction handling, and
                    checkout flow.
                  </p>
                </div>
              </div>

              <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  <span className="text-warning font-semibold">Intentional Limitation:</span> Live payment execution and
                  webhook-based verification were intentionally not enabled due to deployment and KYC constraints. This
                  mirrors real-world staging environments used before production rollout.
                </p>
              </div>

              <div className="code-block mt-4">
                <code className="text-terminal text-sm">
                  <span className="text-muted-foreground">// Successful path</span>
                  <br />
                  ORDER_CREATED + PAYMENT_PENDING + RESERVED
                  <br />↓ confirm payment and consume reservation<br />
                  ORDER_CONFIRMED + PAYMENT_SUCCESS + CONSUMED
                  <br /><br />
                  <span className="text-muted-foreground">// Failed payment path</span>
                  <br />
                  ORDER_CANCELLED + PAYMENT_FAILED + RELEASED
                </code>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="grid gap-10 md:grid-cols-[minmax(260px,360px)_1fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <SectionHeader
                number="08"
                title="Execution Evidence — Customer Experience"
                subtitle="System UI snapshots demonstrating implementation"
              />
              <Button variant="outline" size="sm" asChild className="mt-4">
                <a href="https://globalscart.onrender.com" target="_blank" rel="noopener noreferrer">
                  View Customer Shop
                </a>
              </Button>
            </div>
            <div className="grid gap-8">
              {customerEvidence.map((image, index) => (
                <EvidenceImage
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  category={image.category}
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="grid gap-10 md:grid-cols-[minmax(260px,360px)_1fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start">
              <SectionHeader number="09" title="Execution Evidence — Admin System" subtitle="Backend monitoring and analytics" />
              <Button variant="outline" size="sm" asChild className="mt-4">
                <a href="https://globalscart.onrender.com/admin/" target="_blank" rel="noopener noreferrer">
                  View Admin Panel
                </a>
              </Button>
            </div>
            <div className="grid gap-8">
              {adminEvidence.map((image, index) => (
                <EvidenceImage
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  category={image.category}
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionHeader number="10" title="Design Decisions" subtitle="Reasoning behind implementation choices" />
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {designDecisions.map((item, index) => (
              <DesignDecision key={index} decision={item.decision} reason={item.reason} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader number="11" title="Limitations & Constraints" subtitle="Explicit scope boundaries" />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {limitations.map((limitation, index) => (
              <LimitationItem key={index} text={limitation} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader number="12" title="Learning Outcomes" subtitle="Skills developed through implementation" />
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            {learnings.map((learning, index) => (
              <LearningOutcome key={index} text={learning} />
            ))}
          </div>
        </section>

        <section className="pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <Code className="w-5 h-5 text-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">Final Statement</span>
            </div>

            <blockquote className="text-xl md:text-2xl text-foreground font-light leading-relaxed">
              "GlobalScart demonstrates <span className="text-primary font-medium">API design, authentication,
              inventory consistency, transactional workflows, payment integration, and analytics</span> across the
              operational constraints of a modern commerce backend."
            </blockquote>
          </div>
        </section>

      </main>

      <footer className="border-t border-border pt-2 pb-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Button variant="outline" asChild>
              <a href="https://github.com/girishk03/GlobalScart" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View Code on GitHub
              </a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              Project documentation for academic portfolio purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GlobalCart360;
