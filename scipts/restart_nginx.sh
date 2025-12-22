#!/bin/bash
set -e
nginx -t
systemctl restart nginx
