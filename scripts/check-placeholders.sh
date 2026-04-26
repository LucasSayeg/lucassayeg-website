#!/usr/bin/env bash
set -euo pipefail

# Pre-ship gate. Fails the build if data.ts still holds placeholder values
# for the regulatory and contact fields. Lucas-supplied content must replace
# every entry below before a production build can succeed.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATA="$ROOT/src/ui/home/data.ts"

if [ ! -f "$DATA" ]; then
  printf 'check-placeholders: missing %s\n' "$DATA" >&2
  exit 1
fi

errors=0

check() {
  local label="$1"
  local pattern="$2"
  if grep -F -q "$pattern" "$DATA"; then
    printf '  - %s still uses placeholder: %s\n' "$label" "$pattern" >&2
    errors=$((errors + 1))
  fi
}

check "whatsappNumber" "55XXXXXXXXXXX"
check "email" "contato@example.com"
check "crp" "CRP 00/00000"

if [ "$errors" -gt 0 ]; then
  printf '\nBuild blocked: %d placeholder value(s) in src/ui/home/data.ts must be replaced with Lucas-supplied content before shipping.\n' "$errors" >&2
  exit 1
fi
