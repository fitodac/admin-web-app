import { createBrowserRouter } from 'react-router-dom'
import App from './App'

import Dashboard from './Dashboard/Dashboard'
import ProjectsList from './Projects/ProjectsList'

import 
	ProjectForm, 
	{ 
		loader as projectFormLoader,
		action as ProjectAction 
	} 
	from './Projects/ProjectForm'

import 
	Project,
	{ loader as projectLoader } 
	from './Projects/Project'


import UsersList from './Users/UsersList'

import 
	UserForm,
	{
		loader as userFormLoader,
		action as userFormAction
	}
	from './Users/UserForm'

import 
	UserProfile, 
	{
		loader as userProfileLoader
	} 
	from './Users/UserProfile'

// import ErrorPage from './ErrorPage'



const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		// errorElement: <ErrorPage />,
		// loader: rootLoader,
		// action: rootAction,
		children: [
			{
				index: true,
				element: <Dashboard />
			},
			{
				path: '/projects',
				element: <ProjectsList />
			},
			{
				path: '/projects/:id',
				element: <Project/>,
				loader: projectLoader
			},
			{
				path: '/projects/add',
				element: <ProjectForm />,
				loader: projectFormLoader,
				action: ProjectAction
			},
			{
				path: '/projects/edit/:id',
				element: <ProjectForm />,
				loader: projectFormLoader,
				action: ProjectAction
			},

			{
				path: '/users',
				element: <UsersList />
			},
			{
				path: 'users/:id',
				element: <UserProfile />,
				loader: userProfileLoader
			},
			{
				path: 'users/add',
				element: <UserForm />,
				loader: userFormLoader,
				action: userFormAction
			},
			{
				path: 'users/edit/:id',
				element: <UserForm />,
				loader: userFormLoader,
				action: userFormAction
			},
		]
	}
])

export default router