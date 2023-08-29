import { User, Session } from 'next-auth';
import { MouseEventHandler } from 'react';

export type FormState = {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
};

export interface SearchParams {
  category?: string;
  endCursor?: string;
};

export interface HomeProps {
  searchParams: SearchParams
};

export interface FooterColumnProps {
  title: string;
  links: string [];
};

export interface AuthProvider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

export interface AdapterUser extends User {
  id: string
  email: string
  emailVerified: Date | null
}

export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
};

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
};

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
};

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface FormFieldProps {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

export interface CustomMenuProps {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};

export interface CustomButtonProps {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  submitting?: boolean;
  type?: 'button' | 'submit';
  bgColor?: string;
  textColor ?: string;
};

export interface ProjectFormProps {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

export interface ProjectSearch {
  projectSearch: {
    edges: { node: ProjectInterface } [];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    }
  }
};

export interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

export interface RelatedProjectsProps {
  userId: string;
  projectId: string;
};

export interface ProjectActionsProps {
  projectId: string;
};

export interface LoadMoreProps {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export interface UserPageProps {
  params: {
    id: string
  }
};

export interface ProfilePageProps {
  user: UserProfile
};