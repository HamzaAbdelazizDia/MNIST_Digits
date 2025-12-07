#!/bin/bash
# Script to set up Supabase database tables via psql

# Connection string
DB_URL="postgresql://postgres:forsa2025@db.eijmptueuwuoupbvixdt.supabase.co:5432/postgres"

echo "Creating Supabase database tables..."

# Execute the SQL schema file
PGPASSWORD=forsa2025 psql "$DB_URL" -f supabase-schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database tables created successfully!"
else
    echo "❌ Failed to create database tables"
    exit 1
fi
