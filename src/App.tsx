import { useEffect, useState, type ReactNode, type SVGProps } from "react";

type Step =
  | "welcome"
  | "user-info"
  | "services"
  | "bike"
  | "custom-bike"
  | "knows"
  | "find-pressure"
  | "pressure"
  | "connect"
  | "inflating"
  | "leak-check"
  | "diagnostic-connect"
  | "diagnosing"
  | "leak-result"
  | "tire-system"
  | "patches"
  | "patch-detail"
  | "complete"
  | "drinks"
  | "payment"
  | "paid"
  | "dispensing"
  | "collect"
  | "thanks";

type IconProps = SVGProps<SVGSVGElement>;

type Bike = {
  name: string;
  shortName: string;
  range: string;
  min: number;
  max: number;
  icon: "city" | "mountain" | "road" | "fat" | "other";
};

type Product = {
  name: string;
  description: string;
  price: number;
  color: string;
  icon: string;
  detail?: string;
  bestFor?: string;
};

const bikes: Bike[] = [
  {
    name: "Urbana / Paseo / BMX",
    shortName: "Urbana",
    range: "40 – 65 PSI",
    min: 40,
    max: 65,
    icon: "city",
  },
  {
    name: "Montaña (MTB)",
    shortName: "Montaña",
    range: "25 – 40 PSI",
    min: 25,
    max: 40,
    icon: "mountain",
  },
  {
    name: "Ruta / Carreras",
    shortName: "Ruta",
    range: "80 – 110 PSI",
    min: 80,
    max: 110,
    icon: "road",
  },
  {
    name: "Gravel / Llanta Ancha",
    shortName: "Gravel",
    range: "15 – 30 PSI",
    min: 15,
    max: 30,
    icon: "fat",
  },
];

const drinks: Product[] = [
  {
    name: "Agua",
    description: "Botella 600 ml",
    price: 20,
    color: "bg-indigo-100 text-indigo-700",
    icon: "H₂O",
  },
  {
    name: "Bebida energética",
    description: "Lata 473 ml",
    price: 45,
    color: "bg-fuchsia-100 text-fuchsia-800",
    icon: "MAX",
  },
  {
    name: "Refresco",
    description: "Botella 600 ml",
    price: 30,
    color: "bg-purple-100 text-purple-700",
    icon: "POP",
  },
  {
    name: "Suero",
    description: "Botella 625 ml",
    price: 38,
    color: "bg-violet-100 text-violet-700",
    icon: "+",
  },
];

const patchCatalog: Record<string, Product[]> = {
  Urbana: [
    {
      name: "Parches autoadheribles",
      description: "Kit estándar · 6 piezas",
      price: 55,
      color: "bg-violet-100 text-violet-700",
      icon: "6×",
      detail:
        "Se colocan sin pegamento y se adhieren rápidamente a cámaras tradicionales. Son compactos y fáciles de usar.",
      bestFor: "Uso urbano, paseo y BMX a presión baja o moderada.",
    },
    {
      name: "Parches vulcanizados",
      description: "Kit con adhesivo · 8 piezas",
      price: 48,
      color: "bg-purple-100 text-purple-700",
      icon: "8×",
      detail:
        "Solución económica y duradera que crea una unión resistente con la cámara mediante adhesivo vulcanizante.",
      bestFor: "Reparaciones permanentes en cámaras tradicionales.",
    },
  ],
  Montaña: [
    {
      name: "Parches reforzados MTB",
      description: "Formato grande · 5 piezas",
      price: 75,
      color: "bg-indigo-100 text-indigo-700",
      icon: "MTB",
      detail:
        "Parches amplios y reforzados que cubren pinchazos más grandes producidos por piedras o raíces.",
      bestFor: "Llantas de montaña con cámara tradicional.",
    },
    {
      name: "Kit de mechas y plugs",
      description: "Punzón + 5 mechas",
      price: 145,
      color: "bg-fuchsia-100 text-fuchsia-700",
      icon: "PLG",
      detail:
        "Permite sellar una perforación Tubeless desde el exterior sin desmontar la llanta.",
      bestFor: "Sistemas Tubeless de montaña.",
    },
  ],
  Ruta: [
    {
      name: "Parches ultra delgados",
      description: "Alta presión · 6 piezas",
      price: 85,
      color: "bg-violet-100 text-violet-700",
      icon: "HP",
      detail:
        "Su perfil ultradelgado evita baches al rodar y su adhesivo soporta presiones elevadas.",
      bestFor: "Llantas delgadas de ruta entre 80 y 120 PSI.",
    },
    {
      name: "Kit Tubeless de ruta",
      description: "Micro mechas · 5 piezas",
      price: 165,
      color: "bg-purple-100 text-purple-700",
      icon: "TL",
      detail:
        "Micro mechas diseñadas para perforaciones pequeñas en neumáticos Tubeless de alta presión.",
      bestFor: "Sistemas Tubeless de ruta.",
    },
  ],
  Gravel: [
    {
      name: "Mechas de reparación rápida",
      description: "Kit Gravel · 5 piezas",
      price: 150,
      color: "bg-fuchsia-100 text-fuchsia-700",
      icon: "GRV",
      detail:
        "Sella cortes y perforaciones desde afuera para que puedas continuar tu recorrido en pocos minutos.",
      bestFor: "Llantas Gravel o anchas con sistema Tubeless.",
    },
    {
      name: "Parches estándar",
      description: "Para cámara · 6 piezas",
      price: 55,
      color: "bg-indigo-100 text-indigo-700",
      icon: "6×",
      detail:
        "Kit autoadherible compatible con cámaras tradicionales de llantas anchas.",
      bestFor: "Bicicletas Gravel que utilizan cámara.",
    },
  ],
  Otro: [
    {
      name: "Kit universal de emergencia",
      description: "Parches + lija",
      price: 70,
      color: "bg-violet-100 text-violet-700",
      icon: "UNI",
      detail:
        "Incluye parches autoadheribles medianos y una lija compacta. Compatible con la mayoría de cámaras.",
      bestFor: "Bicicletas plegables, infantiles, de carga y otros modelos.",
    },
  ],
};

function Icon({
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

const BikeIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="6" cy="17" r="4" />
    <circle cx="18" cy="17" r="4" />
    <path d="m6 17 4-8h4l4 8M8.5 12h7M10 9 8.5 6H6M14 9l2-3h2" />
  </Icon>
);

const ArrowIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14M14 7l5 5-5 5" />
  </Icon>
);

const BackIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m15 18-6-6 6-6" />
  </Icon>
);

const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
);

const GaugeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4.9 19a9 9 0 1 1 14.2 0M12 3v2M3 12h2M19 12h2" />
    <path d="m12 13 4-4" />
  </Icon>
);

const CardIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 10h19M6 15h4" />
  </Icon>
);

const BottleIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M9 3h6v4l2 3v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l2-3zM9 7h6M7 12h10" />
  </Icon>
);

const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </Icon>
);

const UserIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
);

const ToolIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14.5 6.5a4 4 0 0 0-5-5L12 4l-3 3-2.5-2.5a4 4 0 0 0 5 5L19 17l-2 2-7.5-7.5" />
  </Icon>
);

const AlertIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M10.3 3.5 2.4 18a2 2 0 0 0 1.8 3h15.6a2 2 0 0 0 1.8-3L13.7 3.5a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </Icon>
);

const QrIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="3" width="6" height="6" />
    <rect x="15" y="3" width="6" height="6" />
    <rect x="3" y="15" width="6" height="6" />
    <path d="M15 15h2v2h-2zM19 15h2v6h-6v-2M11 3v4M11 11h4M7 11v2" />
  </Icon>
);

function Button({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`cursor-pointer transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-14 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-base font-semibold text-[var(--navy)] outline-none transition focus:border-[var(--green-dark)] focus:ring-4 focus:ring-violet-100 ${className}`}
      {...props}
    />
  );
}

function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[var(--green)] px-7 py-4 text-base font-bold text-[var(--navy)] shadow-[var(--button-shadow)] hover:-translate-y-0.5 hover:bg-[var(--green-light)] ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

function Shell({
  children,
  step,
  onBack,
}: {
  children: ReactNode;
  step: Step;
  onBack?: () => void;
}) {
  const showProgress = [
    "bike",
    "custom-bike",
    "knows",
    "find-pressure",
    "pressure",
    "connect",
    "inflating",
    "leak-check",
    "leak-result",
    "complete",
  ].includes(step);
  const phases = ["Bicicleta", "Presión", "Inflado", "Listo"];
  const phaseIndex = ["bike"].includes(step)
    ? 0
    : ["knows", "find-pressure", "pressure", "connect"].includes(step)
      ? 1
      : ["inflating", "leak-check"].includes(step)
        ? 2
        : 3;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--navy)]">
      <div className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-[var(--green)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 size-96 rounded-full bg-violet-200/30 blur-3xl" />

      <header className="relative z-10 flex h-20 items-center justify-between border-b border-[var(--line)] bg-white/80 px-5 backdrop-blur md:px-10">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-[var(--navy)] text-[var(--green)]">
            <BikeIcon className="size-7" />
          </div>
          <div>
            <div className="font-display text-lg font-extrabold leading-none">AIRE LIBRE</div>
            <div className="mt-1 text-xs font-bold tracking-widest text-[var(--muted)]">
              CENTRO DE INFLADO
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 sm:flex">
          <span className="size-2 rounded-full bg-violet-500" />
          Servicio gratuito · 24 h
        </div>
      </header>

      {showProgress && (
        <div className="relative z-10 mx-auto flex max-w-3xl items-center justify-center gap-2 px-5 pt-6 sm:gap-4">
          {phases.map((phase, index) => (
            <div key={phase} className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div
                className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                  index <= phaseIndex
                    ? "bg-[var(--navy)] text-white"
                    : "border border-[var(--line)] bg-white text-[var(--muted)]"
                }`}
              >
                {index < phaseIndex ? <CheckIcon className="size-4" /> : index + 1}
              </div>
              <span
                className={`hidden text-xs font-bold sm:inline ${
                  index <= phaseIndex ? "text-[var(--navy)]" : "text-[var(--muted)]"
                }`}
              >
                {phase}
              </span>
              {index < phases.length - 1 && (
                <div
                  className={`h-px w-6 sm:w-14 ${
                    index < phaseIndex ? "bg-[var(--navy)]" : "bg-[var(--line)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {onBack && (
        <Button
          aria-label="Volver"
          onClick={onBack}
          className="absolute top-24 left-5 z-20 grid size-11 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--navy)] shadow-sm hover:bg-[var(--soft)] md:left-10"
        >
          <BackIcon className="size-5" />
        </Button>
      )}

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-10 md:px-10">
        {children}
      </main>
    </div>
  );
}

function Title({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <div className="mb-3 text-xs font-extrabold tracking-widest text-[var(--green-dark)] uppercase">
          {eyebrow}
        </div>
      )}
      <div className="font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
        {title}
      </div>
      {description && (
        <div className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
          {description}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState<Step>("welcome");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [service, setService] = useState<"inflate" | "diagnostic" | "drinks">("inflate");
  const [bike, setBike] = useState<Bike | null>(null);
  const [customBikeName, setCustomBikeName] = useState("");
  const [customPressure, setCustomPressure] = useState("40");
  const [pressure, setPressure] = useState(40);
  const [inflation, setInflation] = useState(0);
  const [leakDetected, setLeakDetected] = useState(true);
  const [tireSystem, setTireSystem] = useState<"camera" | "tubeless" | null>(null);
  const [drink, setDrink] = useState<Product | null>(null);
  const [patch, setPatch] = useState<Product | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "phone" | "qr">("card");

  useEffect(() => {
    if (step !== "inflating") return;

    setInflation(0);
    const interval = window.setInterval(() => {
      setInflation((value) => {
        if (value >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => setStep("leak-check"), 700);
          return 100;
        }
        return Math.min(100, value + 2);
      });
    }, 70);

    return () => window.clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (!["leak-check", "diagnosing"].includes(step)) return;
    const timer = window.setTimeout(() => setStep("leak-result"), 2600);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== "dispensing") return;
    const timer = window.setTimeout(() => setStep("collect"), 2800);
    return () => window.clearTimeout(timer);
  }, [step]);

  const chooseBike = (selectedBike: Bike) => {
    setBike(selectedBike);
    setPressure(Math.round((selectedBike.min + selectedBike.max) / 2));
    setStep(service === "diagnostic" ? "diagnostic-connect" : "knows");
  };

  const saveCustomBike = () => {
    const value = Math.max(5, Math.min(130, Number(customPressure) || 40));
    const selectedBike: Bike = {
      name: customBikeName.trim() || "Otro tipo",
      shortName: "Otro",
      range: `${value} PSI`,
      min: value,
      max: value,
      icon: "other",
    };
    chooseBike(selectedBike);
  };

  const openPatches = () => {
    setPatch(null);
    if (bike?.shortName === "Montaña" || bike?.shortName === "Gravel") {
      setStep("tire-system");
    } else {
      setStep("patches");
    }
  };

  const restart = () => {
    setFirstName("");
    setLastName("");
    setBike(null);
    setCustomBikeName("");
    setCustomPressure("40");
    setDrink(null);
    setPatch(null);
    setInflation(0);
    setTireSystem(null);
    setLeakDetected(true);
    setService("inflate");
    setStep("welcome");
  };

  const selectedProduct = patch ?? drink;

  if (step === "welcome") {
    return (
      <Shell step={step}>
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-700 shadow-sm">
              <span className="size-2 rounded-full bg-violet-500" />
              Estación disponible
            </div>
            <div className="font-display text-5xl leading-[1.02] font-extrabold tracking-tight text-balance md:text-7xl">
              Tu camino continúa con la presión correcta.
            </div>
            <div className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
              Infla las llantas de tu bicicleta de forma segura, rápida y totalmente gratuita.
            </div>
            <PrimaryButton
              onClick={() => setStep("user-info")}
              className="mt-9 h-20 w-[400px] max-w-full !font-black"
            >
              Presiona para iniciar
              <ArrowIcon className="size-5" />
            </PrimaryButton>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-[var(--green)]/40 blur-3xl" />
            <div className="relative rounded-4xl border border-white bg-[var(--navy)] p-7 text-white shadow-[var(--hero-shadow)] md:p-10">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white/55">PRESIÓN</div>
                <div className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-[var(--green)]">
                  LISTO
                </div>
              </div>
              <div className="mx-auto my-9 grid aspect-square max-w-72 place-items-center rounded-full border-8 border-white/10 shadow-inner">
                <div className="text-center">
                  <GaugeIcon className="mx-auto mb-2 size-10 text-[var(--green)]" />
                  <div className="font-display text-7xl font-extrabold">PSI</div>
                  <div className="mt-2 text-sm text-white/45">Sensor inteligente</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {["Seguro", "Rápido", "Gratis"].map((item) => (
                  <div key={item} className="rounded-xl bg-white/5 py-3 text-sm font-bold">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "user-info") {
    const ready = firstName.trim().length > 1 && lastName.trim().length > 1;
    return (
      <Shell step={step} onBack={() => setStep("welcome")}>
        <div className="w-full max-w-2xl">
          <Title
            eyebrow="Antes de comenzar"
            title="¿Quién utilizará la estación?"
            description="Ingresa tus datos para personalizar la experiencia y registrar el servicio."
          />
          <div className="mt-9 rounded-4xl border border-[var(--line)] bg-white p-6 shadow-lg md:p-9">
            <div className="mx-auto mb-7 grid size-16 place-items-center rounded-2xl bg-[var(--soft)] text-[var(--green-dark)]">
              <UserIcon className="size-8" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <div className="mb-2 text-sm font-extrabold">Nombre(s)</div>
                <Input
                  aria-label="Nombre o nombres"
                  autoComplete="given-name"
                  placeholder="Ej. Daniela"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 text-sm font-extrabold">Apellidos</div>
                <Input
                  aria-label="Apellidos"
                  autoComplete="family-name"
                  placeholder="Ej. Hernández López"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-violet-50 p-4 text-sm leading-relaxed text-violet-800">
              Tus datos se usarán únicamente durante esta sesión y se borrarán al finalizar.
            </div>
            <PrimaryButton
              disabled={!ready}
              onClick={() => setStep("services")}
              className="mt-7 w-full"
            >
              Continuar
              <ArrowIcon className="size-5" />
            </PrimaryButton>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "services") {
    const serviceOptions = [
      {
        id: "inflate" as const,
        title: "Inflar mi llanta",
        text: "Ajusta la presión y revisa automáticamente si existen fugas.",
        icon: GaugeIcon,
      },
      {
        id: "diagnostic" as const,
        title: "Solo diagnóstico",
        text: "Conecta la llanta para saber si está perdiendo presión.",
        icon: SearchIcon,
      },
      {
        id: "drinks" as const,
        title: "Comprar bebidas",
        text: "Accede directamente a agua, suero, refrescos y bebidas energéticas.",
        icon: BottleIcon,
      },
    ];

    return (
      <Shell step={step} onBack={() => setStep("user-info")}>
        <div className="w-full">
          <Title
            eyebrow={`Hola, ${firstName}`}
            title="¿Qué deseas hacer hoy?"
            description="Selecciona un servicio para comenzar."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            {serviceOptions.map((option, index) => (
              <Button
                key={option.id}
                onClick={() => {
                  setService(option.id);
                  if (option.id === "drinks") {
                    setDrink(null);
                    setStep("drinks");
                  } else {
                    setStep("bike");
                  }
                }}
                className={`group min-h-72 rounded-3xl border p-7 text-left shadow-sm hover:-translate-y-1 hover:shadow-xl ${
                  index === 0
                    ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                    : "border-[var(--line)] bg-white"
                }`}
              >
                <div
                  className={`grid size-16 place-items-center rounded-2xl ${
                    index === 0
                      ? "bg-[var(--green)] text-[var(--navy)]"
                      : "bg-[var(--soft)] text-[var(--green-dark)] group-hover:bg-[var(--green)]"
                  }`}
                >
                  <option.icon className="size-8" />
                </div>
                <div className="font-display mt-8 text-2xl font-extrabold">{option.title}</div>
                <div
                  className={`mt-3 text-sm leading-relaxed ${
                    index === 0 ? "text-white/60" : "text-[var(--muted)]"
                  }`}
                >
                  {option.text}
                </div>
                <div className="mt-7 flex items-center gap-2 text-sm font-extrabold">
                  Seleccionar <ArrowIcon className="size-4" />
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "bike") {
    return (
      <Shell step={step} onBack={() => setStep("services")}>
        <div className="w-full">
          <Title
            eyebrow="Paso 1 de 3"
            title="¿Qué tipo de bicicleta tienes?"
            description="Selecciona la opción que más se parece a tu bicicleta. Así podremos recomendarte la presión adecuada."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {bikes.map((option) => (
              <Button
                key={option.name}
                onClick={() => chooseBike(option)}
                className="group flex min-h-36 items-center gap-5 rounded-3xl border border-[var(--line)] bg-white p-5 text-left shadow-sm hover:-translate-y-1 hover:border-[var(--green-dark)] hover:shadow-lg md:p-7"
              >
                <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[var(--soft)] text-[var(--navy)] group-hover:bg-[var(--green)]">
                  <BikeIcon
                    className={`size-9 ${
                      option.icon === "road"
                        ? "-rotate-3"
                        : option.icon === "mountain"
                          ? "scale-110"
                          : ""
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-lg font-extrabold md:text-xl">{option.name}</div>
                  <div className="mt-2 text-sm font-semibold text-[var(--muted)]">
                    Presión recomendada
                  </div>
                  <div className="mt-0.5 text-base font-extrabold text-[var(--green-dark)]">
                    {option.range}
                  </div>
                </div>
                <ArrowIcon className="size-5 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-1" />
              </Button>
            ))}
            <Button
              onClick={() => setStep("custom-bike")}
              className="group flex min-h-36 items-center gap-5 rounded-3xl border border-dashed border-[var(--green-dark)] bg-violet-50/60 p-5 text-left shadow-sm hover:-translate-y-1 hover:bg-violet-50 hover:shadow-lg md:p-7"
            >
              <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white text-[var(--green-dark)]">
                <span className="text-3xl font-light">+</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-lg font-extrabold md:text-xl">Otro tipo</div>
                <div className="mt-2 text-sm text-[var(--muted)]">
                  Agrega el modelo y la presión indicada en tu llanta.
                </div>
              </div>
              <ArrowIcon className="size-5 text-[var(--muted)]" />
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "custom-bike") {
    return (
      <Shell step={step} onBack={() => setStep("bike")}>
        <div className="w-full max-w-2xl">
          <Title
            eyebrow="Bicicleta personalizada"
            title="Agrega tu tipo de bicicleta"
            description="Escribe el tipo y la presión indicada en el costado de la llanta."
          />
          <div className="mt-9 rounded-4xl border border-[var(--line)] bg-white p-6 shadow-lg md:p-9">
            <div>
              <div className="mb-2 text-sm font-extrabold">Tipo de bicicleta</div>
              <Input
                aria-label="Otro tipo de bicicleta"
                placeholder="Ej. Plegable, infantil o de carga"
                value={customBikeName}
                onChange={(event) => setCustomBikeName(event.target.value)}
              />
            </div>
            <div className="mt-5">
              <div className="mb-2 text-sm font-extrabold">Presión de la llanta</div>
              <div className="relative">
                <Input
                  aria-label="Presión de la llanta en PSI"
                  inputMode="numeric"
                  placeholder="40"
                  value={customPressure}
                  onChange={(event) => setCustomPressure(event.target.value.replace(/\D/g, ""))}
                  className="pr-20"
                />
                <span className="absolute top-1/2 right-5 -translate-y-1/2 text-sm font-extrabold text-[var(--muted)]">
                  PSI
                </span>
              </div>
            </div>
            <PrimaryButton
              disabled={!customBikeName.trim() || !customPressure}
              onClick={saveCustomBike}
              className="mt-7 w-full"
            >
              Guardar y continuar
              <ArrowIcon className="size-5" />
            </PrimaryButton>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "knows") {
    return (
      <Shell step={step} onBack={() => setStep("bike")}>
        <div className="w-full">
          <Title
            eyebrow={`Bicicleta ${bike?.shortName}`}
            title="¿Conoces la presión de tu llanta?"
            description="Puedes encontrarla escrita en el costado de la llanta. Normalmente aparece como un rango seguido de las letras PSI."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <Button
              onClick={() => setStep("pressure")}
              className="group rounded-3xl border-2 border-transparent bg-[var(--navy)] p-7 text-left text-white shadow-xl hover:-translate-y-1"
            >
              <div className="mb-8 grid size-12 place-items-center rounded-2xl bg-[var(--green)] text-[var(--navy)]">
                <CheckIcon className="size-6" />
              </div>
              <div className="font-display text-2xl font-extrabold">Sí, la conozco</div>
              <div className="mt-2 text-sm leading-relaxed text-white/60">
                Quiero indicar la presión que necesita mi llanta.
              </div>
            </Button>
            <Button
              onClick={() => setStep("find-pressure")}
              className="group rounded-3xl border border-[var(--line)] bg-white p-7 text-left shadow-sm hover:-translate-y-1 hover:border-[var(--green-dark)] hover:shadow-lg"
            >
              <div className="mb-8 grid size-12 place-items-center rounded-2xl bg-[var(--soft)] text-[var(--navy)] group-hover:bg-[var(--green)]">
                <SearchIcon className="size-6" />
              </div>
              <div className="font-display text-2xl font-extrabold">No estoy seguro</div>
              <div className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Ayúdame a encontrarla o usa una recomendación segura.
              </div>
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "find-pressure") {
    return (
      <Shell step={step} onBack={() => setStep("knows")}>
        <div className="w-full max-w-4xl">
          <Title
            eyebrow="Te ayudamos"
            title="Busca el número en el costado"
            description="Gira la rueda lentamente y revisa el texto en relieve que está a un lado de la llanta."
          />
          <div className="mt-9 grid gap-5 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-lg md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-2xl bg-[var(--navy)]">
              <div className="absolute size-72 rounded-full border-16 border-slate-700" />
              <div className="absolute top-1/2 right-4 -translate-y-1/2 rounded-xl bg-[var(--green)] px-4 py-3 font-mono text-sm font-bold text-[var(--navy)] shadow-lg">
                40–65 PSI
              </div>
              <SearchIcon className="relative size-12 text-white/50" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-5">
                {[
                  ["1", "Ubica el costado", "No busques en la parte que toca el suelo."],
                  ["2", "Gira la rueda", "Busca un texto como “40–65 PSI” o “MAX 65 PSI”."],
                  ["3", "No excedas el máximo", "Elige un valor dentro del rango indicado."],
                ].map(([number, label, text]) => (
                  <div key={number} className="flex gap-4">
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--green)] text-sm font-extrabold">
                      {number}
                    </div>
                    <div>
                      <div className="font-display font-extrabold">{label}</div>
                      <div className="mt-1 text-sm text-[var(--muted)]">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <PrimaryButton onClick={() => setStep("pressure")} className="mt-7">
                Ya la encontré / Usar recomendación
                <ArrowIcon className="size-5" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "pressure") {
    const recommended = Math.round(((bike?.min ?? 30) + (bike?.max ?? 40)) / 2);
    return (
      <Shell step={step} onBack={() => setStep("knows")}>
        <div className="w-full max-w-3xl">
          <Title
            eyebrow="Paso 2 de 3"
            title="Selecciona la presión"
            description={`Para ${bike?.name}, el rango recomendado es ${bike?.range}.`}
          />
          <div className="mx-auto mt-10 max-w-xl rounded-4xl border border-[var(--line)] bg-white p-6 text-center shadow-lg md:p-9">
            <div className="text-sm font-bold text-[var(--muted)]">PRESIÓN OBJETIVO</div>
            <div className="mt-5 flex items-center justify-center gap-5">
              <Button
                aria-label="Reducir presión"
                onClick={() => setPressure((value) => Math.max(bike?.min ?? 15, value - 1))}
                className="grid size-14 place-items-center rounded-2xl border border-[var(--line)] bg-[var(--soft)] text-3xl font-medium hover:bg-[var(--green)]"
              >
                −
              </Button>
              <div className="min-w-36">
                <span className="font-display text-7xl font-extrabold tracking-tight">{pressure}</span>
                <span className="ml-2 text-lg font-extrabold text-[var(--muted)]">PSI</span>
              </div>
              <Button
                aria-label="Aumentar presión"
                onClick={() => setPressure((value) => Math.min(bike?.max ?? 110, value + 1))}
                className="grid size-14 place-items-center rounded-2xl border border-[var(--line)] bg-[var(--soft)] text-3xl font-medium hover:bg-[var(--green)]"
              >
                +
              </Button>
            </div>
            <Button
              onClick={() => setPressure(recommended)}
              className="mt-5 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 hover:bg-violet-100"
            >
              Usar recomendado: {recommended} PSI
            </Button>
            <div className="mt-7 flex justify-between border-t border-[var(--line)] pt-5 text-sm">
              <span className="text-[var(--muted)]">Rango seguro</span>
              <span className="font-extrabold">{bike?.range}</span>
            </div>
            <PrimaryButton onClick={() => setStep("connect")} className="mt-7 w-full">
              Confirmar {pressure} PSI
              <ArrowIcon className="size-5" />
            </PrimaryButton>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "connect") {
    return (
      <Shell step={step} onBack={() => setStep("pressure")}>
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto grid size-28 place-items-center rounded-full bg-[var(--green)] text-[var(--navy)] shadow-[var(--button-shadow)]">
            <GaugeIcon className="size-14" />
          </div>
          <Title
            eyebrow="Último paso"
            title="Conecta la boquilla a la llanta"
            description="Asegúrala firmemente en la válvula. El sensor detectará la presión actual antes de comenzar."
          />
          <div className="mx-auto mt-7 flex max-w-xl items-center gap-4 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-left text-sm text-violet-900">
            <div className="grid size-8 shrink-0 place-items-center rounded-full bg-violet-200 font-extrabold">i</div>
            El inflado se detendrá automáticamente al llegar a {pressure} PSI.
          </div>
          <div className="mx-auto mt-4 max-w-xl rounded-2xl border border-dashed border-[var(--line)] bg-white p-4">
            <div className="text-xs font-extrabold tracking-widest text-[var(--muted)] uppercase">
              Resultado del sensor para la demostración
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button
                onClick={() => setLeakDetected(false)}
                className={`rounded-xl px-4 py-3 text-sm font-bold ${
                  !leakDetected ? "bg-[var(--navy)] text-white" : "bg-[var(--soft)]"
                }`}
              >
                Presión estable
              </Button>
              <Button
                onClick={() => setLeakDetected(true)}
                className={`rounded-xl px-4 py-3 text-sm font-bold ${
                  leakDetected ? "bg-[var(--navy)] text-white" : "bg-[var(--soft)]"
                }`}
              >
                Simular fuga
              </Button>
            </div>
          </div>
          <PrimaryButton onClick={() => setStep("inflating")} className="mt-8">
            Ya está conectada · Comenzar
            <ArrowIcon className="size-5" />
          </PrimaryButton>
        </div>
      </Shell>
    );
  }

  if (step === "diagnostic-connect") {
    return (
      <Shell step={step} onBack={() => setStep("bike")}>
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto grid size-28 place-items-center rounded-full bg-[var(--green)] text-[var(--navy)] shadow-[var(--button-shadow)]">
            <SearchIcon className="size-14" />
          </div>
          <Title
            eyebrow="Diagnóstico de fugas"
            title="Conecta la boquilla a la llanta"
            description="El sensor medirá la presión durante unos segundos para detectar si el aire está escapando."
          />
          <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-dashed border-[var(--line)] bg-white p-4">
            <div className="text-xs font-extrabold tracking-widest text-[var(--muted)] uppercase">
              Resultado del sensor para la demostración
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button
                onClick={() => setLeakDetected(false)}
                className={`rounded-xl px-4 py-3 text-sm font-bold ${
                  !leakDetected ? "bg-[var(--navy)] text-white" : "bg-[var(--soft)]"
                }`}
              >
                Sin fuga
              </Button>
              <Button
                onClick={() => setLeakDetected(true)}
                className={`rounded-xl px-4 py-3 text-sm font-bold ${
                  leakDetected ? "bg-[var(--navy)] text-white" : "bg-[var(--soft)]"
                }`}
              >
                Con fuga
              </Button>
            </div>
          </div>
          <PrimaryButton onClick={() => setStep("diagnosing")} className="mt-8">
            Iniciar diagnóstico
            <ArrowIcon className="size-5" />
          </PrimaryButton>
        </div>
      </Shell>
    );
  }

  if (step === "inflating") {
    const currentPressure = Math.round(12 + (pressure - 12) * (inflation / 100));
    return (
      <Shell step={step}>
        <div className="w-full max-w-3xl text-center">
          <div className="text-xs font-extrabold tracking-widest text-[var(--green-dark)] uppercase">
            Inflado en proceso
          </div>
          <div className="font-display mt-3 text-3xl font-extrabold md:text-5xl">
            Mantén la boquilla conectada
          </div>
          <div className="relative mx-auto mt-9 grid size-72 place-items-center rounded-full bg-[var(--navy)] text-white shadow-[var(--hero-shadow)] md:size-80">
            <svg className="absolute inset-3 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="var(--green)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="276.5"
                strokeDashoffset={276.5 - 276.5 * (inflation / 100)}
              />
            </svg>
            <div className="relative">
              <div className="font-display text-7xl font-extrabold">{inflation}%</div>
              <div className="mt-1 text-sm font-bold text-white/50">COMPLETADO</div>
            </div>
          </div>
          <div className="mx-auto mt-7 grid max-w-md grid-cols-2 divide-x divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
            <div>
              <div className="text-xs font-bold text-[var(--muted)]">PRESIÓN ACTUAL</div>
              <div className="font-display mt-1 text-2xl font-extrabold">{currentPressure} PSI</div>
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--muted)]">OBJETIVO</div>
              <div className="font-display mt-1 text-2xl font-extrabold">{pressure} PSI</div>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "leak-check" || step === "diagnosing") {
    return (
      <Shell step={step}>
        <div className="w-full max-w-2xl text-center">
          <div className="relative mx-auto grid size-64 place-items-center rounded-full bg-[var(--navy)] text-white shadow-[var(--hero-shadow)]">
            <div className="absolute inset-5 animate-ping rounded-full border border-[var(--green)]/40" />
            <SearchIcon className="size-20 animate-pulse text-[var(--green)]" />
          </div>
          <Title
            eyebrow="Sensor activo"
            title="Analizando la presión"
            description="Estamos comprobando si la llanta mantiene el aire de forma estable. No retires la boquilla."
          />
          <div className="mx-auto mt-8 h-2 max-w-sm overflow-hidden rounded-full bg-[var(--line)]">
            <div className="h-full animate-[loading_2.6s_ease-in-out_forwards] rounded-full bg-[var(--green-dark)]" />
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "leak-result") {
    if (leakDetected) {
      return (
        <Shell step={step}>
          <div className="w-full max-w-3xl text-center">
            <div className="mx-auto grid size-28 place-items-center rounded-full bg-amber-100 text-amber-700">
              <AlertIcon className="size-14" />
            </div>
            <Title
              eyebrow="Atención"
              title="¡Ups! Detectamos una pérdida de presión"
              description="Tu llanta podría tener una fuga. La presión bajó durante la prueba y te recomendamos repararla antes de continuar."
            />
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left">
              <div>
                <div className="text-xs font-bold text-amber-700">PRESIÓN INICIAL</div>
                <div className="font-display mt-1 text-2xl font-extrabold">{pressure} PSI</div>
              </div>
              <div className="border-l border-amber-200 pl-4">
                <div className="text-xs font-bold text-amber-700">PÉRDIDA DETECTADA</div>
                <div className="font-display mt-1 text-2xl font-extrabold">−3 PSI</div>
              </div>
            </div>
            <div className="mx-auto mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
              <PrimaryButton onClick={openPatches}>
                <ToolIcon className="size-5" />
                Ver parches compatibles
              </PrimaryButton>
              <Button
                onClick={() => setStep(service === "inflate" ? "complete" : "thanks")}
                className="min-h-14 rounded-2xl border border-[var(--line)] bg-white px-6 py-4 font-bold hover:bg-[var(--soft)]"
              >
                Ahora no
              </Button>
            </div>
          </div>
        </Shell>
      );
    }

    return (
      <Shell step={step}>
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto grid size-28 place-items-center rounded-full bg-violet-500 text-white shadow-xl">
            <CheckIcon className="size-14" />
          </div>
          <Title
            eyebrow="Diagnóstico completado"
            title="No detectamos fugas"
            description="La presión se mantuvo estable durante la prueba. Tu llanta está lista para continuar."
          />
          <PrimaryButton
            onClick={() => setStep(service === "inflate" ? "complete" : "thanks")}
            className="mt-9"
          >
            Continuar
            <ArrowIcon className="size-5" />
          </PrimaryButton>
        </div>
      </Shell>
    );
  }

  if (step === "tire-system") {
    return (
      <Shell step={step} onBack={() => setStep("leak-result")}>
        <div className="w-full max-w-3xl">
          <Title
            eyebrow={`Bicicleta ${bike?.shortName}`}
            title="¿Tu llanta usa cámara o es Tubeless?"
            description="Esta información nos permite recomendar el parche exacto para tu sistema."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                id: "camera" as const,
                title: "Usa cámara",
                text: "Tiene una cámara de aire dentro de la llanta.",
                badge: "CÁMARA",
              },
              {
                id: "tubeless" as const,
                title: "Es Tubeless",
                text: "No utiliza cámara y normalmente contiene líquido sellador.",
                badge: "TL",
              },
            ].map((option) => (
              <Button
                key={option.id}
                onClick={() => {
                  setTireSystem(option.id);
                  setStep("patches");
                }}
                className="group rounded-3xl border border-[var(--line)] bg-white p-7 text-left shadow-sm hover:-translate-y-1 hover:border-[var(--green-dark)] hover:shadow-xl"
              >
                <div className="grid size-16 place-items-center rounded-2xl bg-[var(--soft)] font-display text-lg font-extrabold text-[var(--green-dark)] group-hover:bg-[var(--green)] group-hover:text-[var(--navy)]">
                  {option.badge}
                </div>
                <div className="font-display mt-7 text-2xl font-extrabold">{option.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{option.text}</div>
                <div className="mt-6 flex items-center gap-2 text-sm font-extrabold">
                  Seleccionar <ArrowIcon className="size-4" />
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "patches") {
    const options = patchCatalog[bike?.shortName ?? "Otro"] ?? patchCatalog.Otro;
    const recommendedIndex =
      bike?.shortName === "Montaña"
        ? tireSystem === "tubeless"
          ? 1
          : 0
        : bike?.shortName === "Gravel"
          ? tireSystem === "camera"
            ? 1
            : 0
          : 0;

    return (
      <Shell
        step={step}
        onBack={() =>
          setStep(
            bike?.shortName === "Montaña" || bike?.shortName === "Gravel"
              ? "tire-system"
              : "leak-result",
          )
        }
      >
        <div className="w-full max-w-5xl">
          <Title
            eyebrow="Compatibles con tu bicicleta"
            title="Elige un kit de reparación"
            description={`Estas opciones son adecuadas para ${bike?.name}. Presiona un producto para conocer todos sus detalles.`}
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {options.map((option, index) => (
              <Button
                key={option.name}
                onClick={() => {
                  setPatch(option);
                  setDrink(null);
                  setStep("patch-detail");
                }}
                className="group relative rounded-3xl border border-[var(--line)] bg-white p-7 text-left shadow-sm hover:-translate-y-1 hover:border-[var(--green-dark)] hover:shadow-xl"
              >
                {index === recommendedIndex && (
                  <div className="absolute top-5 right-5 rounded-full bg-[var(--green)] px-3 py-1.5 text-xs font-extrabold">
                    RECOMENDADO
                  </div>
                )}
                <div className={`grid size-20 place-items-center rounded-2xl font-display text-xl font-extrabold ${option.color}`}>
                  {option.icon}
                </div>
                <div className="font-display mt-7 text-2xl font-extrabold">{option.name}</div>
                <div className="mt-2 text-sm text-[var(--muted)]">{option.description}</div>
                <div className="mt-7 flex items-end justify-between">
                  <div className="font-display text-3xl font-extrabold">${option.price}</div>
                  <div className="flex items-center gap-2 text-sm font-extrabold text-[var(--green-dark)]">
                    Ver información <ArrowIcon className="size-4" />
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "patch-detail" && patch) {
    return (
      <Shell step={step} onBack={() => setStep("patches")}>
        <div className="w-full max-w-4xl">
          <div className="grid gap-6 rounded-4xl border border-[var(--line)] bg-white p-6 shadow-xl md:grid-cols-[0.8fr_1.2fr] md:p-10">
            <div className={`grid min-h-72 place-items-center rounded-3xl ${patch.color}`}>
              <div className="text-center">
                <ToolIcon className="mx-auto size-16" />
                <div className="font-display mt-4 text-4xl font-extrabold">{patch.icon}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-extrabold tracking-widest text-[var(--green-dark)] uppercase">
                Recomendación para {bike?.shortName}
              </div>
              <div className="font-display mt-3 text-3xl font-extrabold md:text-4xl">{patch.name}</div>
              <div className="mt-4 text-base leading-relaxed text-[var(--muted)]">{patch.detail}</div>
              <div className="mt-5 rounded-2xl bg-[var(--soft)] p-4">
                <div className="text-xs font-extrabold text-[var(--muted)]">IDEAL PARA</div>
                <div className="mt-1 text-sm font-bold">{patch.bestFor}</div>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
                <div>
                  <div className="text-xs font-bold text-[var(--muted)]">PRECIO</div>
                  <div className="font-display text-4xl font-extrabold">${patch.price}</div>
                </div>
                <PrimaryButton onClick={() => setStep("payment")}>
                  Comprar este kit
                  <ArrowIcon className="size-5" />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "complete") {
    return (
      <Shell step={step}>
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto grid size-28 place-items-center rounded-full bg-violet-500 text-white shadow-xl">
            <CheckIcon className="size-14" />
          </div>
          <Title
            eyebrow="Inflado completado"
            title={`¡Tu llanta está lista a ${pressure} PSI!`}
            description="Retira la boquilla con cuidado. Muchas gracias por usar el Centro de Inflado Aire Libre."
          />
          <div className="mx-auto mt-9 max-w-2xl rounded-3xl border border-[var(--line)] bg-white p-6 shadow-lg">
            <div className="font-display text-xl font-extrabold">¿Quieres comprar una bebida?</div>
            <div className="mt-2 text-sm text-[var(--muted)]">
              Rehidrátate antes de continuar tu recorrido.
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <PrimaryButton onClick={() => setStep("drinks")}>
                <BottleIcon className="size-5" />
                Sí, ver bebidas
              </PrimaryButton>
              <Button
                onClick={() => setStep("thanks")}
                className="min-h-14 rounded-2xl border border-[var(--line)] bg-[var(--soft)] px-7 py-4 font-bold hover:bg-slate-200"
              >
                No, gracias
              </Button>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "drinks") {
    return (
      <Shell
        step={step}
        onBack={() => setStep(service === "drinks" ? "services" : "complete")}
      >
        <div className="w-full">
          <Title
            eyebrow="Hidratación"
            title="Elige tu bebida"
            description="Selecciona una opción. El inflado siempre es gratuito; solo pagarás por la bebida."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {drinks.map((option) => {
              const selected = drink?.name === option.name;
              return (
                <Button
                  key={option.name}
                  onClick={() => {
                    setDrink(option);
                    setPatch(null);
                  }}
                  className={`relative rounded-3xl border-2 bg-white p-5 text-left shadow-sm hover:-translate-y-1 hover:shadow-lg ${
                    selected ? "border-[var(--navy)] ring-2 ring-[var(--green)]" : "border-transparent"
                  }`}
                >
                  {selected && (
                    <div className="absolute top-4 right-4 grid size-7 place-items-center rounded-full bg-[var(--navy)] text-white">
                      <CheckIcon className="size-4" />
                    </div>
                  )}
                  <div className={`grid size-16 place-items-center rounded-2xl text-lg font-extrabold ${option.color}`}>
                    {option.icon}
                  </div>
                  <div className="font-display mt-5 text-xl font-extrabold">{option.name}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{option.description}</div>
                  <div className="font-display mt-5 text-2xl font-extrabold">${option.price}</div>
                </Button>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center">
            <PrimaryButton disabled={!drink} onClick={() => setStep("payment")}>
              Continuar al pago
              <ArrowIcon className="size-5" />
            </PrimaryButton>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "payment") {
    return (
      <Shell step={step} onBack={() => setStep(patch ? "patch-detail" : "drinks")}>
        <div className="w-full max-w-4xl">
          <Title
            eyebrow="Pago seguro"
            title="Selecciona cómo quieres pagar"
            description="Paga con código QR, insertando tu tarjeta o acercando tu teléfono o tarjeta."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-[var(--navy)] p-7 text-white shadow-[var(--hero-shadow)]">
              <div className="text-sm font-bold text-white/45">RESUMEN</div>
              <div className="mt-8 flex items-center gap-4">
                <div className={`grid size-16 place-items-center rounded-2xl text-lg font-extrabold ${selectedProduct?.color}`}>
                  {selectedProduct?.icon}
                </div>
                <div className="flex-1">
                  <div className="font-display text-xl font-extrabold">{selectedProduct?.name}</div>
                  <div className="text-sm text-white/50">{selectedProduct?.description}</div>
                </div>
                <div className="font-display text-2xl font-extrabold">${selectedProduct?.price}</div>
              </div>
              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Inflado de llanta</span>
                  <span className="font-bold text-[var(--green)]">GRATIS</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-[var(--line)] bg-white p-6 shadow-lg">
              <div className="text-sm font-extrabold">Método de pago</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { id: "card" as const, label: "Tarjeta", icon: CardIcon },
                  { id: "phone" as const, label: "Teléfono", icon: CardIcon },
                  { id: "qr" as const, label: "Código QR", icon: QrIcon },
                ].map((method) => (
                  <Button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-xs font-bold ${
                      paymentMethod === method.id
                        ? "border-[var(--navy)] bg-[var(--soft)] ring-2 ring-[var(--green)]"
                        : "border-[var(--line)]"
                    }`}
                  >
                    <method.icon className="size-7" />
                    {method.label}
                  </Button>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[var(--soft)] p-4">
                {paymentMethod === "qr" ? (
                  <QrIcon className="size-14 shrink-0" />
                ) : (
                  <div className="relative grid size-14 shrink-0 place-items-center rounded-full bg-white">
                    <CardIcon className="size-8" />
                    <span className="absolute -right-1 bottom-1 size-3 animate-ping rounded-full bg-[var(--green-dark)]" />
                  </div>
                )}
                <div className="text-left">
                  <div className="font-display font-extrabold">
                    {paymentMethod === "qr"
                      ? "Escanea el código"
                      : paymentMethod === "phone"
                        ? "Acerca tu teléfono"
                        : "Inserta o acerca tu tarjeta"}
                  </div>
                  <div className="mt-1 text-xs text-[var(--muted)]">Terminal lista para recibir el pago.</div>
                </div>
              </div>
              <PrimaryButton onClick={() => setStep("paid")} className="mt-6 w-full">
                Simular pago
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "paid") {
    return (
      <Shell step={step}>
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto grid size-28 place-items-center rounded-full bg-violet-500 text-white shadow-xl">
            <CheckIcon className="size-14" />
          </div>
          <Title
            eyebrow="Pago aprobado"
            title="¡Pago completado!"
            description={`Recibimos tu pago de $${selectedProduct?.price}. Tu producto está listo para dispensarse.`}
          />
          <PrimaryButton onClick={() => setStep("dispensing")} className="mt-9">
            Dispensar producto
            <ArrowIcon className="size-5" />
          </PrimaryButton>
        </div>
      </Shell>
    );
  }

  if (step === "dispensing") {
    return (
      <Shell step={step}>
        <div className="w-full max-w-xl text-center">
          <div className="relative mx-auto grid size-32 place-items-center rounded-3xl bg-[var(--navy)] text-[var(--green)] shadow-xl">
            {patch ? (
              <ToolIcon className="size-16 animate-bounce" />
            ) : (
              <BottleIcon className="size-16 animate-bounce" />
            )}
            <div className="absolute -bottom-3 h-3 w-20 rounded-full bg-black/10 blur-sm" />
          </div>
          <Title
            eyebrow="Un momento"
            title="Estamos dispensando tu producto"
            description="Espera a que el compartimento se abra. No introduzcas la mano todavía."
          />
          <div className="mx-auto mt-8 h-2 max-w-sm overflow-hidden rounded-full bg-[var(--line)]">
            <div className="h-full animate-[loading_2.8s_ease-in-out_forwards] rounded-full bg-[var(--green-dark)]" />
          </div>
        </div>
      </Shell>
    );
  }

  if (step === "collect") {
    return (
      <Shell step={step}>
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto grid size-32 place-items-center rounded-3xl border-4 border-[var(--green)] bg-white text-[var(--navy)] shadow-xl">
            {patch ? <ToolIcon className="size-16" /> : <BottleIcon className="size-16" />}
          </div>
          <Title
            eyebrow="Compartimento abierto"
            title="Toma tu producto"
            description={`${selectedProduct?.name} ya está disponible en la bandeja inferior.`}
          />
          <PrimaryButton onClick={() => setStep("thanks")} className="mt-9">
            Ya tomé mi producto
            <CheckIcon className="size-5" />
          </PrimaryButton>
        </div>
      </Shell>
    );
  }

  return (
    <Shell step="thanks">
      <div className="w-full max-w-3xl text-center">
        <div className="mx-auto grid size-24 place-items-center rounded-full bg-[var(--green)]">
          <BikeIcon className="size-12" />
        </div>
        <Title
          eyebrow="Proceso finalizado"
          title="¡Muchas gracias!"
          description="Gracias por cuidar tu bicicleta y moverte de forma sostenible. Que tengas un excelente recorrido."
        />
        <PrimaryButton onClick={restart} className="mt-9">
          Inflar otra llanta
          <ArrowIcon className="size-5" />
        </PrimaryButton>
        <div className="mt-6 text-sm font-semibold text-[var(--muted)]">
          Centro de Inflado Aire Libre · Servicio gratuito para la comunidad
        </div>
      </div>
    </Shell>
  );
}
