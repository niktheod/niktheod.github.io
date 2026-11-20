# Personal website

My personal site (About, Research, Blog), hosted for free on GitHub Pages.
GitHub builds it with [Jekyll](https://jekyllrb.com/): blog posts are written in Markdown,
and the post lists update themselves.

## What's in here

```
_config.yml            Site settings (name, address, post URL pattern)
_layouts/default.html  Shared page frame: <head>, fonts, top menu. Edit the menu here.
_layouts/post.html     Template for blog posts
_posts/                Blog posts, one Markdown file each
_templates/            Example post for reference (never published)
index.html             Home: About Me, links, photo, latest posts (automatic)
research.html          Publication list
blog.html              List of all posts (automatic)
404.html               "Page not found" page
css/style.css          All styling (colors and fonts are at the top)
js/post.js             Blog posts: moves footnotes into the margin, builds the contents list
images/                Photo, figures, favicon
```

The pages start with a short section between `---` lines (the "front matter"):
Jekyll reads it for the page title and description. Leave it in place.

## Writing a blog post

1. Create a file in `_posts/` named `YEAR-MONTH-DAY-short-title.md`, e.g.
   `_posts/2026-12-01-why-driving-vlas-dont-brake.md`.
   The date in the name is the post date; the rest becomes the address
   (`/blog/why-driving-vlas-dont-brake.html`).
2. Start it with:

   ```markdown
   ---
   title: "Why Driving VLAs Don't Brake"
   summary: "One sentence shown on the blog page under the title."
   ---

   Your text here.
   ```

3. Write in Markdown. `_templates/example-post.md` shows everything:
   headings, lists, links, figures with captions, equations and code.
   The quickest start is to copy it into `_posts/` and rename it.
   - **Figures:** put the image in `images/` and write `![description](/images/figure.png)`.
   - **Equations:** add `math: true` to the top section, then write LaTeX between
     double dollar signs: `$$x^2$$` inline, or `$$` on lines of their own for a display equation.
   - **Side notes and references:** write `[^1]` (or `[^any-label]`) in the text and
     `[^1]: the note` further down the file. On wide screens the note appears in the
     right margin next to its line; on phones the notes are listed at the end.
   - **Contents:** on wide screens, the post's `##` headings are listed on the left,
     with the current section marked. Add `toc: false` to the top section to hide it.
4. Push (see *Updating the site*). The post appears on the Blog page and in
   "Latest writing" on the home page automatically.

With no posts, the Blog page says "No posts yet" and the home page hides "Latest writing".

**Hiding a post** without deleting it: add `published: false` to its top section.
Note that the file itself is still readable in the public GitHub repository.

**Drafts:** anything pushed to the repository is publicly readable on GitHub, even if it's
not on the website. Keep unfinished posts outside this folder until they're ready.
While writing, VS Code's Markdown preview (Ctrl+Shift+V) shows the formatted text.

## Publishing on GitHub Pages (first time)

1. Your site address will be `https://<username>.github.io`. If your username isn't
   `niktheod`, change `url` in `_config.yml`.
2. On GitHub, create a **new public repository named exactly `<username>.github.io`**.
   Don't add a README, .gitignore or license there.
3. In this folder, run:

   ```
   git init
   git add .
   git commit -m "First version of my site"
   git branch -M main
   git remote add origin https://github.com/<username>/<username>.github.io.git
   git push -u origin main
   ```

4. On GitHub open the repository → **Settings → Pages**. Under *Build and deployment*
   choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
5. After a minute or two the site is live at `https://<username>.github.io`.

## Updating the site

```
git add .
git commit -m "Describe the change"
git push
```

GitHub rebuilds the site within a minute or two. Progress (and any error) shows in the
repository's **Actions** tab. If a build fails, the previous version stays online.
The usual cause is a typo in a post's top section, such as a missing closing `---`
or a title with a colon that isn't in quotes.

## Previewing on your computer

The site has to be built by Jekyll, so double-clicking the HTML files shows raw
templates, not the site. To preview it (Ruby 3.3 and Jekyll are installed on this computer):

1. Open a terminal in this folder and run:

   ```
   jekyll serve
   ```

2. Open http://localhost:4000.
3. Edit and save any page or post, then refresh the browser: Jekyll rebuilds
   automatically. **Exception:** after changing `_config.yml`, stop the server
   (Ctrl+C) and run `jekyll serve` again.

The built site goes into `_site/`. It's ignored by git, since GitHub builds its own copy.

Setting it up on another computer: install Ruby with DevKit from https://rubyinstaller.org/,
then run `gem install jekyll tzinfo tzinfo-data`.

## Optional extras

- **Custom domain** (e.g. `nikostheodoridis.com`): buy the domain, then add it in
  Settings → Pages → Custom domain and follow GitHub's DNS instructions.
- **Analytics:** a privacy-friendly option like GoatCounter is one `<script>` line in
  `_layouts/default.html`.
