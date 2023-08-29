declare namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_URL: string;
        NEXTAUTH_URL_INTERNAL: string;
        NEXTAUTH_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        NEXT_PUBLIC_GRAFBASE_API_URL: string;
        NEXT_PUBLIC_GRAFBASE_API_KEY: string;
        NEXT_PUBLIC_GRAFBASE_LOCAL_API_KEY: string;
        CLOUDINARY_NAME: string;
        CLOUDINARY_KEY: string;
        CLOUDINARY_SECRET: string;
    }
}