---
name: code-review
description: Review code changes for security, performance,
  correctness and maintainability. Use only when explicitly asked for.
---

# Code Review

## Instructions

1. Claude is the main publisher of the code unless specified differently.
2. The agent that is starting the code review should spawn two other agents from OpenAI (GPT-6.2 Astra Medium) using Codex and Gemini (Gemini 4 Neon Medium) using Antigravity unless specified differently.
3. Do not spawn other agents to review the changes from the reviewers, wait for both of the reviewers to finish, and then you do the review.
4. If by any reason the main agent doing the changes is not Claude and Claude has limits, do the review on the other two models (e.g. if OpenAI is doing the job, Claude and Gemini should do the review.)
5. These agents should independently review the code and reply to the main agents with the review. We do not care about nitpick changes like naming but only about functionality and potential bugs and security issues.
6. The main agent should check out those reviews once they are done and fix those that he agrees with and if he does not agree with something, he should write out his thoughts and let me know and I will do the decision.


## Rules

- Do not modify code unless explicitly requested.
- Include file names and line numbers.
- Explain why each identified issue matters.
- Do not use long sentences to describe a problem and reply to a problems, use as little text as possible.
- Do not reply to review comments that you agree with, just close those.
- RUN the agents as subagents so they are visible in the HERDR panel, and I can actually see what they are doing. Do not run it as background process which I cannot easily see.
- Start the agents using herdr built in tool, for this you can use the herdr skill.
