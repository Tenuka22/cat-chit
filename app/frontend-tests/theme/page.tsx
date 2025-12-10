import { Button } from "@/components/ui/button";

function ColorPreviewItem({
  label,
  bg,
  fg,
}: {
  label: string;
  bg: string;
  fg: string;
}) {
  return (
    <div className="group/color-preview flex flex-col gap-space-sm">
      <div className={`${bg} rounded-lg p-space-md border-2 border-border`}>
        <div className="flex flex-col gap-space-sm">
          <h6 className={`${fg} text-xl font-bold`}>{label}</h6>
          <p className={`${fg} text-sm opacity-90`}>
            The rapid growth of urban centers presents unique challenges for
            sustainable living, requiring innovative solutions for transport,
            waste, and energy
          </p>
          <div
            className={`flex rounded-lg gap-2 bg-linear-to-br from-slate-50 to-slate-100 w-fit p-space-sm`}
          >
            <Button variant="empty" className={`${fg} ${bg}`}>
              Button
            </Button>
            <Button variant="empty" className={`${bg} ${fg}`}>
              Inverted
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-space-sm px-space-md pt-space-sm">
        <span className="text-xs text-muted-foreground font-mono">{bg}</span>
        <span className="text-xs text-muted-foreground/60 font-mono">{fg}</span>
      </div>
    </div>
  );
}

function ColorSwatchRow({
  colors,
}: {
  colors: Array<{ name: string; class: string }>;
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-space-md md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
      {colors.map((color) => (
        <div
          key={color.name}
          className="flex text-muted-foreground/70 text-center flex-col items-center gap-1"
        >
          <div className={`w-16 h-16 rounded-lg ${color.class} border`} />
          <div className="flex flex-col gap-0 pt-space-sm">
            <span className="text-xs text-muted-foreground font-mono">
              {color.name}
            </span>
            <span className="text-xs text-muted-foreground/60 font-mono">
              {color.class}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const THEME_PAGE = () => {
  const mainColors = [
    { name: "Primary", bg: "bg-primary", fg: "text-primary-foreground" },
    { name: "Secondary", bg: "bg-secondary", fg: "text-secondary-foreground" },
    { name: "Tertiary", bg: "bg-tertiary", fg: "text-tertiary-foreground" },
    { name: "Accent", bg: "bg-accent", fg: "text-accent-foreground" },
  ];

  const pastelColors = [
    { name: "Pastel Pink", bg: "bg-pastel-pink", fg: "text-slate-900" },
    { name: "Pastel Mint", bg: "bg-pastel-mint", fg: "text-slate-900" },
    { name: "Pastel Yellow", bg: "bg-pastel-yellow", fg: "text-slate-900" },
    { name: "Pastel Lavender", bg: "bg-pastel-lavender", fg: "text-slate-900" },
    { name: "Pastel Sky", bg: "bg-pastel-sky", fg: "text-slate-900" },
  ];

  const utilityColors = [
    { name: "Muted", class: "bg-muted" },
    { name: "Border", class: "bg-border" },
  ];

  const allSwatches = [
    { name: "Primary", class: "bg-primary" },
    { name: "Primary FG", class: "bg-primary-foreground" },
    { name: "Secondary", class: "bg-secondary" },
    { name: "Secondary FG", class: "bg-secondary-foreground" },
    { name: "Tertiary", class: "bg-tertiary" },
    { name: "Tertiary FG", class: "bg-tertiary-foreground" },
    { name: "Accent", class: "bg-accent" },
    { name: "Accent FG", class: "bg-accent-foreground" },
    { name: "Pastel Pink", class: "bg-pastel-pink" },
    { name: "Pastel Mint", class: "bg-pastel-mint" },
    { name: "Pastel Yellow", class: "bg-pastel-yellow" },
    { name: "Pastel Lavender", class: "bg-pastel-lavender" },
    { name: "Pastel Sky", class: "bg-pastel-sky" },
    { name: "Muted", class: "bg-muted" },
    { name: "Muted FG", class: "bg-muted-foreground" },
    { name: "Border", class: "bg-border" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-space-lg flex items-center justify-center">
      <div className="max-w-7xl flex flex-col gap-space-md">
        <header className="text-center pt-space-massive">
          <h1 className="text-5xl font-bold text-slate-900">
            Theme Color System
          </h1>
          <p className="text-slate-600 text-lg">
            Complete color palette with contrast examples
          </p>
        </header>

        <section className="flex flex-col">
          <h2 className="text-3xl font-bold text-slate-800">Main Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainColors.map((color) => (
              <ColorPreviewItem
                key={color.name}
                label={color.name}
                bg={color.bg}
                fg={color.fg}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-3xl font-bold text-slate-800">Pastel Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastelColors.map((color) => (
              <ColorPreviewItem
                key={color.name}
                label={color.name}
                bg={color.bg}
                fg={color.fg}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-3xl font-bold text-slate-800">
            All Color Swatches
          </h2>
          <div className="bg-white rounded-xl p-8 border border-border">
            <ColorSwatchRow colors={allSwatches} />
          </div>
        </section>

        <section className="flex flex-col">
          <h2 className="text-3xl font-bold text-slate-800">Utility Colors</h2>
          <div className="bg-white rounded-xl p-8 border border-border">
            <ColorSwatchRow colors={utilityColors} />
          </div>
        </section>
      </div>
    </div>
  );
};
export default THEME_PAGE;
