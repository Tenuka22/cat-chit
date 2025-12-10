"use client";

import {
  H1,
  H2,
  H3,
  H4,
  Lead,
  P,
  Large,
  Small,
  Muted,
  InlineCode,
  MultilineCode,
  List,
  Quote,
  Span,
} from "@/components/ui/typography";
import { Brush } from "lucide-react";

const TYPOGRAPHY_PAGE = () => {
  return (
    <div className="size-full pt-space-massive p-space-lg flex items-start bg-slate-200 justify-center">
      <div className="max-w-7xl flex flex-col gap-space-md">
        <header className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <Brush className="size-space-lg" />
            <H1>Typography System</H1>
          </div>
          <P>A complete showcase of all typography components</P>
        </header>

        <section className="flex flex-col gap-space-sm">
          <H2>Headings</H2>
          <div className="flex flex-col gap-space-md p-space-md rounded-lg border">
            <H1>#Head 1 – The quick brown fox jumps over the lazy dog</H1>
            <H2>#Head 2 – The quick brown fox jumps over the lazy dog</H2>
            <H3>#Head 3 – The quick brown fox jumps over the lazy dog</H3>
            <H4>#Head 4 – The quick brown fox jumps over the lazy dog</H4>
          </div>
        </section>

        <section className="flex flex-col gap-space-sm">
          <H2>Text & Paragraph Components</H2>

          <div className="flex flex-col gap-space-md p-space-md rounded-lg border">
            <Lead>
              Lead — A large introductory paragraph used for summaries or
              descriptions.
            </Lead>

            <P>
              Paragraph — Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Nulla facilisi. Nullam non magna ac augue vulputate
              eleifend.
            </P>

            <Large>Large — Useful for highlighting short important text.</Large>

            <Small>Small — Used for fine print, labels, or metadata.</Small>

            <Muted>Muted — For subtle, low-contrast explanatory text.</Muted>

            <Span>
              This is a Span component — inline, subtle, and low weight.
            </Span>
          </div>
        </section>

        <section className="flex flex-col gap-space-sm">
          <H2>Code Elements</H2>

          <div className="flex flex-col gap-space-md p-space-md rounded-lg border">
            <P>
              Use <InlineCode>npm run dev</InlineCode> or{" "}
              <InlineCode>bun dev</InlineCode> to start the development server.
            </P>

            <MultilineCode>
              {`function greet(name: string) {
  return "Hello " + name;
}

console.log(greet("Tenu"));`}
            </MultilineCode>
          </div>
        </section>

        <section className="flex flex-col gap-space-sm">
          <H2>Lists & Quotes</H2>

          <div className="flex flex-col gap-space-md p-space-md rounded-lg border">
            <List>
              <li>First item — demonstrates default list spacing</li>
              <li>Second item — clean disc list style</li>
              <li>Third item — easy to read and neat</li>
            </List>

            <Quote>
              &quot Design is not just what it looks like and feels like. Design
              is how it works.&quot — Steve Jobs
            </Quote>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TYPOGRAPHY_PAGE;
