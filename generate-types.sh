#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define the output file path
OUTPUT_FILE="src/lib/database.types.ts"

# Generate TypeScript types using Supabase CLI and save to the output file
if command -v supabase >/dev/null 2>&1; then
    supabase gen types typescript --local > "$OUTPUT_FILE"
    echo "TypeScript types generated successfully and saved to $OUTPUT_FILE"
else
    echo "Error: Supabase CLI is not installed or not in PATH." >&2
    exit 1
fi