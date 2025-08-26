import React, { useEffect, useRef, useState } from "react";

export default function App() {
  useEffect(() => {
    // Inject Google Fonts for a hand-drawn vibe
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Space+Grotesk:wght@300;600;700&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-zinc-200 overflow-x-hidden selection:bg-fuchsia-600/30 selection:text-fuchsia-200">
      <SiteTextures />
      <Nav />
      <main>
        <Hero />
        <About />
        <Shows />
        <Gallery />
        <Join />
      </main>
      <Footer />
    </div>
  );
}

function SiteTextures() {
  // Layered textures: vignette, subtle dust, and ghosted geometry
  return (
    <>
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, transparent 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Grainy overlay via gradients */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-10 mix-blend-soft-light opacity-[0.10]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff, #fff 1px, transparent 1px, transparent 3px), repeating-linear-gradient(135deg, #fff, #fff 1px, transparent 1px, transparent 4px)",
        }}
      />
      {/* Soft color fog */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(40% 30% at 20% 10%, rgba(228, 0, 255, 0.08), transparent 60%), radial-gradient(40% 30% at 80% 0%, rgba(0, 180, 255, 0.08), transparent 60%), radial-gradient(30% 25% at 50% 100%, rgba(255, 83, 0, 0.06), transparent 60%)",
        }}
      />
    </>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = [
    { label: "About", href: "#about" },
    { label: "Immersions", href: "#shows" },
    { label: "Gallery", href: "#gallery" },
    { label: "Join", href: "#join" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3">
            <a href="#top" className="group inline-flex items-center gap-3">
              <LogoMark />
              <span
                className="text-2xl tracking-tight group-hover:text-fuchsia-300 transition-colors"
                style={{ fontFamily: 'Caveat, ui-sans-serif, system-ui' }}
              >
                Nocturne Circus Collective
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-8">
              {items.map((it) => (
                <a
                  key={it.href}
                  href={it.href}
                  className="relative text-zinc-300 hover:text-white transition-colors"
                  style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui' }}
                >
                  <span className="relative z-10">{it.label}</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-fuchsia-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href="#join"
                className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-1.5 text-fuchsia-200 hover:bg-fuchsia-500/20 hover:border-fuchsia-400 transition-colors"
              >
                Get Tickets
              </a>
            </nav>
            <button
              aria-label="Open menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => setOpen((v) => !v)}
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-6 bg-zinc-100" />
                <span className="block h-0.5 w-6 bg-zinc-100" />
                <span className="block h-0.5 w-6 bg-zinc-100" />
              </div>
            </button>
          </div>
          {open && (
            <div className="md:hidden px-4 pb-4">
              <div className="flex flex-col gap-3">
                {items.map((it) => (
                  <a
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 hover:bg-white/10"
                  >
                    {it.label}
                  </a>
                ))}
                <a
                  href="#join"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-3 text-center text-fuchsia-200 hover:bg-fuchsia-500/20"
                >
                  Get Tickets
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-block h-8 w-8">
      <span className="absolute inset-0 rounded-full bg-fuchsia-500/20 blur-md" />
      <svg viewBox="0 0 64 64" className="relative z-10 h-8 w-8">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="none" stroke="url(#g)" strokeWidth="2" />
        <path d="M18 42c6-10 22-10 28 0M22 24c0 4 4 8 10 8s10-4 10-8" fill="none" stroke="url(#g)" strokeWidth="2" />
      </svg>
    </span>
  );
}

function Hero() {
  const vidRef = useRef(null);
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    const i = setTimeout(play, 100);
    return () => clearTimeout(i);
  }, []);

  return (
    <section id="top" className="relative isolate">
      <div className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
        <video
          ref={vidRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="https://videos.pexels.com/video-files/3195391/3195391-uhd_2560_1440_30fps.mp4"
          poster="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1920&auto=format&fit=crop"
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
              style={{ fontFamily: 'Caveat, ui-sans-serif, system-ui' }}
            >
              Immersive Circus in Abandoned Shadows
            </h1>
            <p className="mt-4 text-zinc-300/90 text-lg sm:text-xl" style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui' }}>
              We turn forgotten spaces into living dreams. Wander the halls. Follow the drums. Become part of the story.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shows"
                className="rounded-full border border-fuchsia-400/60 bg-fuchsia-500/20 px-6 py-2 text-fuchsia-100 hover:bg-fuchsia-500/30 hover:border-fuchsia-300"
              >
                Upcoming Immersions
              </a>
              <a
                href="#about"
                className="rounded-full border border-white/10 bg-white/10 px-6 py-2 text-white hover:bg-white/20"
              >
                What is Nocturne?
              </a>
            </div>
          </div>
        </div>
        {/* bottom ripple */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b0b0e] to-transparent" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-4xl text-white" style={{ fontFamily: 'Caveat, ui-sans-serif, system-ui' }}>
            Beneath the city, the circus breathes.
          </h2>
          <p className="mt-4 text-zinc-300" style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui' }}>
            We are a roaming collective of acrobats, riggers, musicians, and storytellers. Our stage is whatever a place
            remembers: the cracked tiles of a pool, a rusted factory gantry, stairwells and boiler rooms where echoes live.
            Audiences drift through scenes, choosing which shadows to follow and which secrets to overhear.
          </p>
          <ul className="mt-6 space-y-2 text-zinc-400">
            <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" /> Site-responsive performances</li>
            <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Live soundscapes and aerial rigging</li>
            <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Micro-audiences, multiple storylines</li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-2 -z-10 rounded-3xl bg-gradient-to-br from-fuchsia-500/20 via-cyan-500/10 to-transparent blur-xl" />
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src="https://images.unsplash.com/photo-1518607692856-c7b28adf3c98?q=80&w=1600&auto=format&fit=crop"
              alt="Aerialist in a decaying hall"
              className="h-80 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6 text-zinc-300">
              Every building brings its own ghosts. We listen first, then we fly.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Shows() {
  const shows = [
    {
      title: "Sublevel: Boiler Choir",
      venue: "The Old Municipal Baths",
      date: "Oct 31 – Nov 3",
      desc:
        "Steam, choir, and rope. Navigate the drained pool as voices rise from the tiles.",
      img: "https://images.unsplash.com/photo-1504898770365-c8d7d7d2b16b?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Signal Lost",
      venue: "Telecom Exchange #4",
      date: "Nov 22 – 24",
      desc:
        "Switchboards revive; aerialists route messages overhead while a drummer taps a code.",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Ashen Waltz",
      venue: "Foundry Block C",
      date: "Dec 12 – 15",
      desc:
        "Molten memory. Duets on gantries and a violin under a rain of sparks.",
      img: "https://images.unsplash.com/photo-1504198266285-165a2c0f3ab1?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  return (
    <section id="shows" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-4xl text-white" style={{ fontFamily: 'Caveat, ui-sans-serif, system-ui' }}>Upcoming Immersions</h2>
        <a href="#join" className="text-fuchsia-300 hover:text-fuchsia-200">Get tickets →</a>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {shows.map((s, i) => (
          <article key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative">
              <img src={s.img} alt="Show location" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-zinc-200">
                {s.date}
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl text-white" style={{ fontFamily: 'Caveat, ui-sans-serif, system-ui' }}>{s.title}</h3>
              <p className="text-sm text-zinc-400">{s.venue}</p>
              <p className="mt-3 text-zinc-300 text-sm">{s.desc}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-zinc-400 text-sm">Capacity: 40 per entry</span>
                <button className="rounded-full border border-fuchsia-400/60 bg-fuchsia-500/20 px-4 py-1.5 text-fuchsia-100 hover:bg-fuchsia-500/30">
                  Reserve
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975672208-8b456906c813?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  ];

  return (
    <section id="gallery" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-4xl text-white" style={{ fontFamily: 'Caveat, ui-sans-serif, system-ui' }}>Echoes & Apparitions</h2>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {imgs.map((src, i) => (
          <figure key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src={src} alt="Performance still" className="h-56 w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            <figcaption className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-transparent p-3 text-xs text-zinc-200 opacity-0 transition-opacity group-hover:opacity-100">
              Nocturne, fragment {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Join() {
  return (
    <section id="join" className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/[0.03] p-10">
        <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-fuchsia-500/20 via-cyan-500/10 to-transparent blur-2xl" />
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-3xl text-white" style={{ fontFamily: 'Caveat, ui-sans-serif, system-ui' }}>
              Enter after dark. Leave otherwise.
            </h3>
            <p className="mt-3 text-zinc-300" style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui' }}>
              Join our mailing list for coordinates, early tickets, and the occasional riddle. We never shout—just whisper.
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </section>
  );
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulate API
    setTimeout(() => setStatus("ok"), 900);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 md:flex-row md:items-center">
      <label className="sr-only" htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@twilight.city"
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-fuchsia-400/60"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl border border-fuchsia-400/60 bg-fuchsia-500/20 px-5 py-3 text-fuchsia-100 hover:bg-fuchsia-500/30 disabled:opacity-50"
        disabled={status === "loading" || status === "ok"}
      >
        {status === "loading" ? "Sending…" : status === "ok" ? "You're in" : "Whisper me updates"}
      </button>
      {status === "error" && (
        <div role="status" className="text-sm text-amber-300 md:ml-3">Enter a valid address and try again.</div>
      )}
    </form>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/30 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark />
              <span className="text-xl text-white" style={{ fontFamily: 'Caveat, ui-sans-serif, system-ui' }}>Nocturne Circus Collective</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">Performing wherever the city forgets to look.</p>
          </div>
          <div className="flex gap-5 text-sm text-zinc-400">
            <a href="#about" className="hover:text-zinc-200">About</a>
            <a href="#shows" className="hover:text-zinc-200">Immersions</a>
            <a href="#gallery" className="hover:text-zinc-200">Gallery</a>
            <a href="#join" className="hover:text-zinc-200">Tickets</a>
          </div>
        </div>
        <p className="mt-8 text-xs text-zinc-500">© {new Date().getFullYear()} Nocturne. All rights reserved.</p>
      </div>
    </footer>
  );
}
