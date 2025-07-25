#!/bin/bash

echo Running app on port $PORT...

caddy run --config Caddyfile --adapter caddyfile