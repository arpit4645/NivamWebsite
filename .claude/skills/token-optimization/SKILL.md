---
name: token-optimization
description: Practices for minimizing token/context usage when working in this repo with Claude Code. Use whenever exploring, reading, or editing files here — this site has several large HTML files (index.html, programs.html, about.html) where a full read wastes context. Triggers on "reduce tokens", "context is tight", "large file", or before any broad exploration of this repo.
---

# Token Optimization for NivamWebsite

This is a static HTML/CSS/JS site. Several pages are large single files
(`index.html` ~46KB, `programs.html` ~30KB, `about.html` ~20KB), so careless
full-file reads burn context fast for little benefit. Follow these rules:

## Locate before reading
- Use Grep to find the section, id, class, or string you need before opening
  the file. Don't open `index.html` end-to-end to find one `<section>`.
- Use Glob to confirm a file's existence/path instead of `ls`-ing directories.

## Read narrowly
- When a file is large and you only need one section, use `Read` with
  `offset`/`limit` around the line number Grep reported, not the whole file.
- Only read the full file when you genuinely need full-document context
  (e.g., checking overall structure before a large refactor).

## Edit, don't rewrite
- Use `Edit` with a precise `old_string`/`new_string` for changes — never
  `Read` a whole file just to `Write` it back with one line changed.
- For repeated identical changes (e.g., a shared header/footer duplicated
  across `index.html`, `about.html`, `programs.html`, `contact.html`,
  `workshops.html`, `book.html`, `privacy.html`, `terms.html`), grep all
  occurrences first, then apply targeted edits per file instead of
  round-tripping full contents.

## Avoid redundant work
- Don't re-read a file you already read earlier in the session unless you
  expect it changed.
- Don't `cat`/`head`/`tail` files via Bash — use the dedicated Read/Grep/Glob
  tools, which are cheaper and better integrated.

## Delegate broad exploration
- If a task requires scanning across most/all HTML files (e.g., "find every
  page missing a meta tag"), prefer a single Grep with a glob over multiple
  files rather than reading each file individually.
- For open-ended, multi-step investigation, consider the Explore agent so the
  raw search output doesn't consume the main conversation's context.

## Keep output lean
- Summarize findings instead of pasting large chunks of HTML back into the
  conversation.
