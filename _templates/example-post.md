---
title: "Hello, world: why I started writing"
summary: "A one-sentence teaser that makes people want to read the post."
math: true
---

This is a reference post that shows what you can do in Markdown. It lives in
`_templates/`, which Jekyll ignores, so it never appears on the site. To start a new
post, copy it into `_posts/` with a dated name such as `2026-12-01-my-post.md`.

Paragraphs are just text separated by an empty line. You can use **bold**,
*italics*, `inline code` and [links](https://arxiv.org/abs/2611.20011).

## A section heading

Start a line with `##` for a section heading (or `###` for a smaller one).
On wide screens, every `##` heading is listed in the contents column on the left.
To hide that list for a post, add `toc: false` to its top section.

Bullet lists:

- First point
- Second point

Numbered lists:

1. First step
2. Second step

> A pull quote or a key idea you want to stand out.

## Side notes and references

Put a footnote marker right after the word or sentence it explains, like this.[^note]
On wide screens the note appears in the right margin, level with the line; on phones,
the notes are listed at the end of the post instead.

The same works for citing papers.[^reactbench] The label inside `[^...]` can be any
word: the site numbers the notes 1, 2, 3 in the order they appear in the text.

## Figures

Put the image in `images/` and reference it like this. The line in italics right
below the image becomes its caption.

![Describe what the figure shows](/images/project.svg)
*Figure 1. A caption for the image.*

## Equations

Equations need `math: true` in the top section of the post. Write them between
double dollar signs, inline like $$\pi_\theta(a \mid s)$$, or on their own lines:

$$
\mathcal{L}_{\text{BC}}(\theta) = -\mathbb{E}_{(s,a) \sim \mathcal{D}} \left[ \log \pi_\theta(a \mid s) \right]
$$

## Code

```python
def brake(scene):
    return scene.hazard_ahead()
```

<!-- The notes themselves. They can go anywhere in the file; the end keeps them tidy.
     Indent extra lines by four spaces to keep them in the same note. -->

[^note]: This is a side note. Use it for a detail, a caveat or an aside that would
    interrupt the main text.

[^reactbench]: [ReactBench-AD: Do Driving VLAs and World-Action Models React to Imminent
    Hazards in Their Path?](https://arxiv.org/abs/2611.20011) (Theodoridis et al., 2026)
