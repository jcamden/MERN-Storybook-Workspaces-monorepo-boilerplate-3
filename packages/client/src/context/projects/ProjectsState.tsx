import { IProjectsState, ProjectsActions } from '@merninator/types';
import React, { ReactNode } from 'react';
import { Dispatch, createContext } from 'react';
import { useImmerReducer } from 'use-immer';

import { projectsReducer } from './projectsReducer';

// const projects = [
//   {
//     title: 'milk the fish',
//     completed: true,
//   },
//   {
//     title: 'read the cheese',
//     completed: false,
//   },
//   {
//     title: 'organize the cat-ninjas',
//     completed: false,
//   }
//   {
//     title: 'scold someone',
//     completed: false,
//   },
// ];

const initialState: IProjectsState = {
  projects: [],
};

interface ProjectsStateProps {
  children: ReactNode;
}

export const ProjectsStateContext = createContext<IProjectsState>(initialState);
export const ProjectsDispatchContext = createContext<Dispatch<ProjectsActions>>(() => undefined);

export const ProjectsState = ({ children }: ProjectsStateProps): JSX.Element => {
  const [projectsState, projectsDispatch] = useImmerReducer(projectsReducer, initialState);

  return (
    <ProjectsDispatchContext.Provider value={projectsDispatch}>
      <ProjectsStateContext.Provider value={{ ...projectsState }}>{children}</ProjectsStateContext.Provider>
    </ProjectsDispatchContext.Provider>
  );
};
