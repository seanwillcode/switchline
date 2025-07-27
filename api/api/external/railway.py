from dateutil.parser import isoparse

from gql import gql
from .gql_client import client


def get_team_id():
    query = gql(
        """
        query getWorkspaces {
            me {
                workspaces {
                    team {
                        id
                    }
                }
            }
        }
        """
    )

    result = client.execute(query)
    return result["me"]["workspaces"][0]["team"]["id"]


def get_all_projects(team_id: str):
    query = gql(
        """
        query MyQuery {
            team(id: "b0342a79-e1b1-4f26-acb1-95f1d3a5b18e") {
                id
                createdAt
                name
                members {
                    name
                    id
                    email
                }
                projects {
                    edges {
                        node {
                            id
                            name
                            description
                            deletedAt
                            createdAt
                            services {
                                edges {
                                    node {
                                        createdAt
                                        deletedAt
                                        name
                                        id
                                        templateServiceId
                                        deployments {
                                            edges {
                                                node {
                                                canRedeploy
                                                canRollback
                                                createdAt
                                                environmentId
                                                id
                                                meta
                                                status
                                                statusUpdatedAt
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        """
    )

    def _normalize_deployment(edge: dict) -> dict:
        node = edge["node"]
        return {
            "id": node["id"],
            "status": node["status"],
            "createdAt": node["createdAt"],
            "statusUpdatedAt": node["statusUpdatedAt"],
            "canRedeploy": node["canRedeploy"],
        }

    def _normalize_service(edge: dict) -> dict:
        node = edge["node"]

        return {
            "id": node["id"],
            "name": node["name"],
            "createdAt": isoparse(node["createdAt"]) if node["createdAt"] else None,
            "deletedAt": isoparse(node["deletedAt"]) if node["deletedAt"] else None,
            "deployments": sorted(
                [_normalize_deployment(edge) for edge in node["deployments"]["edges"]],
                key=lambda x: x["createdAt"],
            ),
        }

    def _normalize(response: dict) -> dict:
        node = response["node"]
        return {
            "id": node["id"],
            "name": node["name"],
            "description": node["description"],
            "createdAt": isoparse(node["createdAt"]) if node["createdAt"] else None,
            "deletedAt": isoparse(node["deletedAt"]) if node["deletedAt"] else None,
            "services": [
                _normalize_service(edge) for edge in node["services"]["edges"]
            ],
        }

    variables = {"id": team_id}
    result = client.execute(query, variable_values=variables)
    return [_normalize(edge) for edge in result["team"]["projects"]["edges"]]


def create_container(name: str, project_id: str, image: str):
    # Create the service
    mutation = gql(
        """
        mutation CreateService($input: ServiceCreateInput!) {
            serviceCreate(input: $input) {
                id
            }
        }
        """
    )
    variables = {"input": {"projectId": project_id, "source": {"image": image}}}
    create_result = client.execute(mutation, variable_values=variables)
    service_id = create_result["serviceCreate"]["id"]

    # Update the name
    update_mutation = gql(
        """
        mutation UpdateService($id: String!, $input: ServiceUpdateInput!) {
            serviceUpdate(id: $id, input: $input) {
                id
                name
            }
        }
        """
    )

    update_variables = {"id": service_id, "input": {"name": name}}

    update_result = client.execute(update_mutation, variable_values=update_variables)
    return update_result


def get_project(project_id: str):
    query = gql(
        """
        query GetProject($id: String!) {
            project(id: $id) {
                description
                name
                services {
                    edges {
                        node {
                            name
                            updatedAt
                            createdAt
                            deployments {
                                edges {
                                    node {
                                        environment {
                                        createdAt
                                        deletedAt
                                        name
                                        }
                                    }
                                }
                            }
                            repoTriggers {
                                edges {
                                    node {
                                        branch
                                        repository
                                        provider
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        """
    )

    variables = {"id": project_id}

    result = client.execute(query, variable_values=variables)
    return result
