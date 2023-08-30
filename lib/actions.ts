import { GraphQLClient } from 'graphql-request';

import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsBaseQuery, projectsCategoryQuery, projectsCursorQuery, projectsQuery, updateProjectMutation } from '@/graphql';
import { ProjectForm } from '@/types';

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY : process.env.NEXT_PUBLIC_GRAFBASE_LOCAL_API_KEY;

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const isBase64DataUrl = (value: string) => {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
}

export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
    const variables = {
        input: {
            name, email, avatarUrl
        }
    };

    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async() => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const uploadImage = async(imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({ path: imagePath })
        });

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const createNewProject = async(form:ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url) {
        client.setHeader('Authorization', `Bearer ${token}`);
        client.setHeader('x-api-key', apiKey);
        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        };
        
        return makeGraphQLRequest(createProjectMutation, variables);
    }
};

export const fetchAllProjects = async(category: string, endCursor: string) => {
    client.setHeader('x-api-key', apiKey);

    if(category.length > 0 && endCursor.length > 0) return makeGraphQLRequest(projectsQuery, { category, endCursor });
    else if(category.length <= 0 && endCursor.length > 0) return makeGraphQLRequest(projectsCursorQuery, { endCursor });
    else if(category.length > 0 && endCursor.length <= 0) return makeGraphQLRequest(projectsCategoryQuery, { category });
    else return makeGraphQLRequest(projectsBaseQuery, { category });
};

export const getProjectDetails = (id: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = (id: string, token: string) => {
    client.setHeader('Authorization', `Bearer ${token}`)
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const updateProject = async(form: ProjectForm, projectId: string, token: string) => {
    let updatedForm = { ...form };

    const isUploadingNewImage = isBase64DataUrl(form.image);

    if(isUploadingNewImage) {
        const imageUrl = await uploadImage(form.image);
        if(imageUrl.url) {
            updatedForm = {
                ...form,
                image: imageUrl.url
            }
        }
    }

    const variables = {
        id: projectId,
        input: updatedForm
    };

    client.setHeader('Authorization', `Bearer ${token}`)
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(updateProjectMutation, variables);
};