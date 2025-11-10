#!/bin/bash

# Script to install Task on Ubuntu
# Requires sudo privileges

# Function to check if a command exists
command_exists () {
    command -v "$1" >/dev/null 2>&1
}

# Check if curl or wget is installed for downloading files
if command_exists curl; then
    DOWNLOADER="curl -L -o"
elif command_exists wget; then
    DOWNLOADER="wget -O"
else
    echo "Error: Please install curl or wget to proceed with the installation."
    exit 1
fi

# Determine the latest version from GitHub or use a known stable version
LATEST_VERSION=$(curl -s https://api.github.com/repos/go-task/task/releases/latest | grep 'tag_name' | cut -d\" -f4)
if [ -z "$LATEST_VERSION" ]; then
    LATEST_VERSION="v3.30.0"  # Fallback version
fi

# Installation directory
INSTALL_DIR="/usr/local/bin"

# Filename for the downloaded binary
FILENAME="task_linux_amd64.tar.gz"

# URL for the Task binary
DOWNLOAD_URL="https://github.com/go-task/task/releases/download/$LATEST_VERSION/$FILENAME"

# Download Task
echo "Downloading Task version $LATEST_VERSION..."
sudo $DOWNLOADER $FILENAME $DOWNLOAD_URL

# Check if download was successful
if [ $? -eq 0 ]; then
    echo "Download complete."
else
    echo "Failed to download Task. Check your internet connection or the download URL."
    exit 1
fi

# Extract and install Task
echo "Installing Task..."
sudo tar -xzf $FILENAME -C $INSTALL_DIR task

# Clean up
rm $FILENAME

# Verify installation
if command_exists task; then
    echo "Task has been installed successfully. Verifying installation..."
    task --version
else
    echo "Installation might have failed. 'task' command not found."
    exit 1
fi

echo "Installation of Task completed."