---
title: "What does a driving World-Action Model predict will happen when modifying its ego status?"
summary: "A one-sentence teaser that makes people want to read the post."
math: false
---

**TL;DR**:

<!-- The experiments and results in this post began as part of my ReactBench-AD paper[^paper_link] but didn't make it to the final paper because they were incomplete at the time and a deadline was pressing. So I thought instead of having these results burried in my lab computer, it's better to do a bit of effort to finish the experiments and put them in a blog post, so that they are out there. -->

Driving World-Action Models (WAMs) jointly[^jointly_explanation] predict future frames and actions. This offers an easy way to visually inspect what does the model predict that will happen. When evaluating two WAMs on how they react to imminent hazards (pedestrians and vehicles at a close distance) in their path we found that two recent WAMs DriveWAM, and SimWAM largely fail to properly react to these hazards, not managing to avoid collisions. Hence, the natural following question is: what do they imagine that will happen? Do they actually imagine that a collision will follow but they just go ahead anyways?

In order to answer these questions we




[^paper_link]: [https://arxiv.org/abs/2611.20011](https://arxiv.org/abs/2611.20011)
[^jointly_explanation]: "Jointly" is a bit of a oversimplification here. The approaches actually vary. Some models, like [DriveWAM](https://arxiv.org/abs/2605.28544) (partially) denoise the future frames then and then conditioned on that they denoise the action tokens, while other models, like [4D-WAM](https://arxiv.org/abs/2608.10107) denoise both jointly.