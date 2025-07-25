#!/bin/bash

PORT=${PORT:-3000}
echo Running app on port $PORT...

caddy run --config Caddyfile --adapter caddyfile