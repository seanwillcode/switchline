from django.conf import settings
from gql import Client
from gql.transport.requests import RequestsHTTPTransport


# Now you can access the variable
API_TOKEN = settings.RAILWAY_API_TOKEN

transport = RequestsHTTPTransport(
    url="https://backboard.railway.com/graphql/v2",
    headers={
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json",
    },
    verify=True,
    retries=3,
)

client = Client(transport=transport, fetch_schema_from_transport=False)
