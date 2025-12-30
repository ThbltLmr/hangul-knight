#!/bin/bash

set -e

echo "Running tests with coverage..."
bun test --coverage src/logic/ > coverage-output.txt 2>&1 || true

echo ""
echo "Coverage Report:"
cat coverage-output.txt

if grep -q "src/logic/" coverage-output.txt; then
  LOGIC_LINE_COVERAGE=$(grep "src/logic/" coverage-output.txt | awk '{print $4}' | head -1 | sed 's/%//')

  echo ""
  echo "Logic folder line coverage: ${LOGIC_LINE_COVERAGE}%"

  if (( $(echo "$LOGIC_LINE_COVERAGE < 100" | bc -l) )); then
    echo "ERROR: Logic folder does not have 100% line coverage (found ${LOGIC_LINE_COVERAGE}%)"
    rm coverage-output.txt
    exit 1
  fi

  echo "✓ Logic folder has 100% line coverage"
  rm coverage-output.txt
  exit 0
else
  echo "WARNING: Could not find logic folder in coverage report"
  rm coverage-output.txt
  exit 1
fi
