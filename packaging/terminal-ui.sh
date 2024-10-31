#!/bin/bash

# Source environment variables
source /etc/terminal-ui.env

# Start the application
exec /usr/bin/node /usr/lib/terminal-ui/server.js