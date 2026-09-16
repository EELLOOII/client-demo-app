# Git Commit Conventions

## Overview

This project follows the Conventional Commits specification.

Commit messages should be concise, descriptive, and grouped by purpose.

Format:

<type>(optional scope): <short description>

Examples:

feat(products): add product listing page

fix(login): resolve validation issue

refactor(api): simplify request handler

---

# Commit Types

## feat

A new feature.

Examples

feat(products): create product catalog

feat(auth): add login page

feat(dashboard): add statistics cards

---

## fix

Bug fixes.

Examples

fix(products): correct pagination

fix(forms): prevent empty submission

fix(layout): resolve sidebar overflow

---

## refactor

Code improvements without changing functionality.

Examples

refactor(products): split large component

refactor(ui): simplify card component

---

## style

Formatting only.

No logic changes.

Examples

style(button): adjust spacing

style(layout): improve alignment

---

## docs

Documentation updates.

Examples

docs: update project overview

docs: add deployment guide

---

## chore

Maintenance tasks.

Examples

chore: update dependencies

chore: configure eslint

chore: add prettier

---

## test

Testing-related changes.

Examples

test(products): add unit tests

test(api): improve coverage

---

## perf

Performance improvements.

Examples

perf(products): optimize image loading

perf(table): reduce re-renders

---

## build

Changes affecting the build system.

Examples

build: configure Next.js

build: update Tailwind configuration

---

## ci

Continuous Integration changes.

Examples

ci: add GitHub Actions workflow

ci: update GitLab pipeline

---

## revert

Reverting previous commits.

Examples

revert: remove experimental inventory feature

---

# Scope

Use scopes whenever possible.

Common scopes

auth

dashboard

products

inventory

quotations

inquiries

news

promotions

users

layout

ui

api

database

config

docs

---

# Examples

feat(products): create product management page

feat(inventory): add inventory table

feat(news): build news listing page

fix(products): resolve duplicate key warning

fix(layout): prevent sidebar overflow

refactor(products): extract reusable form

style(cards): improve spacing

docs: update coding standards

chore: install shadcn/ui

ci: configure GitHub Actions

build: upgrade Next.js

perf(images): lazy load product images

test(products): add product table tests

---

# Rules

- Keep the summary under 72 characters.
- Use the imperative mood (e.g., "add", "fix", "update"), not the past tense.
- Do not end the summary with a period.
- Make one logical change per commit whenever practical.
- Group related changes into a single commit instead of mixing unrelated work.
- Use lowercase for the commit type and scope.