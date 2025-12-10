import { H1, H2, H3, P, Span } from "@/components/ui/typography";
import { Brush } from "lucide-react";

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
    <div className="group/color-preview flex flex-col gap-space-sm ">
      <div className={`${bg} rounded-lg p-space-md border-2`}>
        <div className="flex flex-col gap-space-sm">
          <H3 className={`${fg} text-xl`}>{label}</H3>
          <P className={`${fg} text-sm opacity-90`}>
            The rapid growth of urban centers presents unique challenges for
            sustainable living, requiring innovative solutions for transport,
            waste, and energy
          </P>
        </div>
      </div>
      <div className="flex flex-col gap-space-sm px-space-md pt-space-sm">
        <Span className="text-xs text-muted-foreground">{bg}</Span>
        <Span className="text-xs text-muted-foreground/60">{fg}</Span>
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
          className="flex pt-space-sm text-muted-foreground/70 flex-col items-center gap-1"
        >
          <div className={`w-16 h-16 rounded-lg ${color.class} border`} />
          <div className="flex flex-col text-center gap-0 pt-space-sm">
            <Span className="text-xs text-muted-foreground">{color.name}</Span>
            <Span className="text-xs text-muted-foreground/60">
              {color.class}
            </Span>
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
    { name: "Pastel Pink", bg: "bg-pastel-pink", fg: "text-slate-700" },
    { name: "Pastel Mint", bg: "bg-pastel-mint", fg: "text-slate-700" },
    { name: "Pastel Yellow", bg: "bg-pastel-yellow", fg: "text-slate-700" },
    { name: "Pastel Lavender", bg: "bg-pastel-lavender", fg: "text-slate-700" },
    { name: "Pastel Sky", bg: "bg-pastel-sky", fg: "text-slate-700" },
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

  const primary_background = "bg-linear-to-br from-slate-100 to-slate-200";

  return (
    <div className="size-full pt-space-massive p-space-lg flex items-start bg-slate-200 justify-center">
      <div className="max-w-7xl flex flex-col gap-space-md">
        <header>
          <div className="flex items-center gap-space-sm">
            <Brush className="size-space-lg" />
            <H1 className="text-5xl ">Theme Color System</H1>
          </div>
          <P className=" text-lg">
            Complete color palette with contrast examples
          </P>
        </header>

        <section className="flex flex-col gap-space-md">
          <H2 className="text-3xl ">Main Colors</H2>
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

        <section className="flex flex-col gap-space-md">
          <H2 className="text-3xl ">Pastel Colors</H2>
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

        <section className="flex flex-col gap-space-md">
          <H2 className="text-3xl ">All Color Swatches</H2>
          <div className={`${primary_background} rounded-sm p-space-md`}>
            <ColorSwatchRow colors={allSwatches} />
          </div>
        </section>

        <section className="flex flex-col gap-space-md">
          <H2 className="text-3xl ">Utility Colors</H2>
          <div className={`${primary_background} rounded-sm p-space-md`}>
            <ColorSwatchRow colors={utilityColors} />
          </div>
        </section>
      </div>
    </div>
  );
};
export default THEME_PAGE;
