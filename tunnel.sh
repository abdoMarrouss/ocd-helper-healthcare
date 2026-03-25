#!/bin/bash
# Start SSH tunnel to cPanel MySQL
# Run this BEFORE starting the NestJS API

echo "Starting SSH tunnel: local:5522 -> remote MySQL:3306"
ssh -i ~/Downloads/id_rsa \
    -f wallnmht@server400.web-hosting.com \
    -p 21098 \
    -L 5522:127.0.0.1:3306 \
    -N \
    -o ServerAliveInterval=30 \
    -o ServerAliveCountMax=6 \
    -o ExitOnForwardFailure=yes

echo "Tunnel running on port 5522"
