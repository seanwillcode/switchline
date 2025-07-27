import os
import json
import openai
from pathlib import Path

from django.conf import settings


OPENAI_API_KEY = settings.OPENAI_API_KEY


class OpenAIException(Exception):
    pass


def make_prompt(json_data: str) -> str:
    return f"""
Here's a JSON object representing the services and deployments within a 
single Railway project for my company. I want you to write a document, in markdown 
format (so it can be used in notion, confluence, or another documentation tool) 
with the following sections completed. I've added notes for each section on what to 
include

Introduction:
- Explain the infra and project architecture at a high-level, for both a technical and 
  non-technical audience
- Give a sentence on how many devops engineers it would take to maintain similar 
  infrastructure in AWS or GCP for this company

Architecture:
Explain the architecture at a high-level, then add one or two paragraphs on the 
components for each service.

JSON:
{json_data}
"""


def generate_documentation(json_data: str, model: str = "gpt-4o") -> tuple[str, str]:
    user_prompt = make_prompt(json_data)

    response = openai.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful assistant that generates infrastructure "
                    "documentation for software projects."
                ),
            },
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.5,
    )

    content = response.choices[0].message.content
    if not content:
        raise OpenAIException("Failed to generate response")

    return user_prompt, content.strip()
