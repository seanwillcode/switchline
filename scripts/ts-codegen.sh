#!/bin/bash

set -e


# generate types from OpenAPI spec from Django Ninja
cd api
uv run python manage.py export_openapi_schema --api config.urls.api --indent 2 --output ../frontend/src/api/types/api-schema.json

cd ../frontend
npx openapi-typescript ./src/api/types/api-schema.json -o ./src/api/types/schema.ts
