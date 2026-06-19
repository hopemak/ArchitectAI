#!/bin/bash
echo "=== ArchitectAI Backend Setup ==="
echo ""
read -p "Enter MongoDB Atlas Username: " DB_USER
read -sp "Enter MongoDB Atlas Password: " DB_PASS
echo ""

sed -i "s/<db_username>/$DB_USER/g" .env
sed -i "s/<db_password>/$DB_PASS/g" .env

echo "✅ Credentials updated in .env"
echo ""
echo "Starting server..."
npm run dev
