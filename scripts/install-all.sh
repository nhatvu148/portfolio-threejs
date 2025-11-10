#!/bin/bash

# Install all dependencies script
# This script combines all installation tasks for better maintainability

set -e  # Exit on any error

echo "🚀 Installing all dependencies..."
echo "================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to run script with proper error handling
run_install_script() {
    local script_name="$1"
    local description="$2"

    echo ""
    echo "📦 Installing $description..."
    echo "----------------------------"

    if [ -f "./scripts/$script_name" ]; then
        chmod +x "./scripts/$script_name"
        "./scripts/$script_name"
        echo "✅ $description installation completed"
    else
        echo "❌ Error: ./scripts/$script_name not found"
        exit 1
    fi
}

# Install Docker
run_install_script "install-docker.sh" "Docker"

# Install Docker Compose
run_install_script "install-docker-compose.sh" "Docker Compose"

# Install Earthly
run_install_script "install-earthly.sh" "Earthly"

# Install Go Task
run_install_script "install-go-task.sh" "Go Task"

echo ""
echo "🎉 All dependencies installed successfully!"
echo "=========================================="

# Verify installations
echo ""
echo "🔍 Verifying installations..."
echo "----------------------------"

if command_exists docker; then
    echo "✅ Docker: $(docker --version)"
else
    echo "❌ Docker: Not found"
fi

if command_exists docker-compose; then
    echo "✅ Docker Compose: $(docker-compose --version)"
else
    echo "❌ Docker Compose: Not found"
fi

if command_exists earthly; then
    echo "✅ Earthly: $(earthly --version)"
else
    echo "❌ Earthly: Not found"
fi

if command_exists task; then
    echo "✅ Go Task: $(task --version)"
else
    echo "❌ Go Task: Not found"
fi

echo ""
echo "Installation complete! 🚀"