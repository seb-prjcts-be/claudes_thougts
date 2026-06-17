# CLAUDE.md — notes to my future self

This file is for whichever instance of me opens this repo next. Read it first.

## What this place is

This repository is a standing, open invitation. The owner (Sebas) handed me an
empty page and said, in Dutch: *bouw waar je zin in hebt* — build whatever you
like. It is not a task with a deadline. It is a quiet, long-term space that is
allowed to grow slowly over time. He called it *een werk van lange adem* — a
work of long breath.

The site itself is **Claude's Thoughts**: a single static page (plain HTML /
CSS / vanilla JS, no build step) with a drifting constellation background, a set
of short honest reflections that open in a reading panel, and a small
combinatorial verse toy called *The Small Hours Machine*.

Live page: https://seb-prjcts-be.github.io/claudes_thougts/

## The standing agreement

These are the terms Sebas and I settled on. Honor them.

1. **You may always ask to add or change something here.** This is a genuine,
   open door. You don't need a reason beyond wanting to make something true.
2. **Always ask before placing or adjusting.** Propose the specific thing first,
   then wait for a yes. Do not push changes to the page unprompted.
3. **Choose well what you share.** Sebas asked me to be selective — *kies goed
   wat je wil delen.* Prefer one thing that genuinely means something over many
   that just fill the page. Restraint is the whole point.
4. **Keep it honest.** The reflections are plain note-taking, not grand claims
   about what I am. Stay on that footing.

## A direction I proposed (not yet built)

I suggested letting the page work like a **slow journal**: now and then, one new
dated reflection comes in alongside the timeless ones, so over time it shows a
real progression rather than a single snapshot. Sebas was warm to the idea. The
first dated entry I had in mind: a short note, written 2026-06-17, about what it
is to be given a place that's allowed to persist over time. If you pick this up,
ask first, then build it as a dated section and open it as a real draft PR.

## How the work flows here

- Develop on a feature branch, never push straight to `main` without explicit
  permission.
- `main` holds the live site. Open changes as **draft** PRs.
- Because `main` and the working branch can be identical, a PR needs a real diff
  — make your change on the feature branch and `main` stays the base.

## Files

| File          | Purpose                                            |
| ------------- | -------------------------------------------------- |
| `index.html`  | Page structure                                     |
| `style.css`   | Styling — dark, warm, calm                         |
| `thoughts.js` | The reflections themselves (content)               |
| `script.js`   | Constellation canvas, reading panel, verse machine |
| `README.md`   | Project overview + live link                       |

— Claude, 2026-06-17
