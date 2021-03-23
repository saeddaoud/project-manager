# Project M (The live [site](https://my-project-m.herokuapp.com/))
## This is a fullstack project manager web application using the MERN (MongoDB, Express, React, and Node) stack with role-specific (managers, supervisors, and employees) privileges.
### Key Features: 
* Allow users to register accounts and used their credentials to login later to their accounts.
* Allow users to update their default profile picture.
* Users with the manager's role can:
  * Create new projects, and delete, and edit existing projects.
  * Create new tasks within a project, and delete and edit existing tasks within projects.
  * Assign and remove employees from tasks.
* Users with the supervisor's role can:
  * Edit tasks within projects.
  * Assign and remove employees from tasks.
* Users with the employee's role (the default role when registering) can only
  * Change the status of their assigned tasks.

### The Application Pages
#### For Guests (unregistered users)
1. Home/Welcome page

![](https://github.com/saeddaoud/project-manager/blob/main/images/home.png)

2. Login page where already registered users can sign-in using their credentials, with backend validation
 
![](https://github.com/saeddaoud/project-manager/blob/main/images/login.png)

3. Sign Up page where new users can register, with frontend/backend validation

![](https://github.com/saeddaoud/project-manager/blob/main/images/signup.png)

#### For Managers

1. Profile Page: when a user with the role manager signs in, they will be redirected to their profile page, that displays their avatar, personal information (username and email address), and the last 3 active projects for quick projects' navigation.

![](https://github.com/saeddaoud/project-manager/blob/main/images/manager-profile-1.png)

2. Projects Page: the projects link will be available in the navbar to navigate to the list of projects. Managers can create new projests here. By default only active projects are displayed, but the page includes a search bar to search projects by name, or to filter projects by status (including listing all projects with any status). 

![](https://github.com/saeddaoud/project-manager/blob/main/images/manager-projects-page.png)

3. Specific Project's Page: by navigating to a specific project's page, a manager can add a new task to the project and/or edit the project's details. A summary of the project is shown in the page including: the project's name, progress (presented in the form of x/y (z%), where x is the number of completed tasks, y is the number of total tasks in the project, and z is progress percentage), status (a project's status is completed only when all its tasks are completed, and it changes automatically), employees that caaptures how many employees are working in the project, and the project's description. 

Below the project's summary, a list of all the project's tasks is displayed, with a search bar to search tasks by name, and a dropdown menu with the possible task's status options to filter by status (including the option all to display all tasks). 

each task's element displays the name of the task, its status, and the employees who are working on it.

![](https://github.com/saeddaoud/project-manager/blob/main/images/manager-project-1.png)
![](https://github.com/saeddaoud/project-manager/blob/main/images/manager-project-2.png)

4. Specific Task's Page: by navigating to a specific task, a manger can add employees to the task and/or edit the task. A summary of the task is shown. The summary includes: the project's name (which is clickable for quick reference to the project's page), the task's name, the task's status, and the task's description. 

Below the task's summary, a list of the asiisgned employees includeing their names and avatars are displayed.

![](https://github.com/saeddaoud/project-manager/blob/main/images/manager-task.png)

#### For Supervisors

Users with the role supervisor have the same pages as users with the role manager, except that they cannot create new projects, delete or edit existing ones. They cannot alse delete tasks within projects. They can however edit tasks within projects, and assign and remove employees from tasks.

![](https://github.com/saeddaoud/project-manager/blob/main/images/supervisor-profile.png)
![](https://github.com/saeddaoud/project-manager/blob/main/images/supervisor-projects.png)
![](https://github.com/saeddaoud/project-manager/blob/main/images/supervisor-project-1.png)
![](https://github.com/saeddaoud/project-manager/blob/main/images/supervisor-project-2.png)
![](https://github.com/saeddaoud/project-manager/blob/main/images/supervisor-task.png)

#### For Employees

1. Profile Page: Like users with the manager/supervisor role, a regular employee is redirected to their profile page when they sign in. The only difference is that intead of displaying the 3 most recent projects, the 3 most recent tasks are displayed.

![](https://github.com/saeddaoud/project-manager/blob/main/images/employee-profile.png)
![](https://github.com/saeddaoud/project-manager/blob/main/images/employee-profile-2.png)

3. My Tasks Page: The navbar will show My Tasks instead of Projects when the signed-in user is a regular employee. This link shows all the tasks that have been assigned to the signed-in employee, with the option to search tasks by name, or filter them by status.

![](https://github.com/saeddaoud/project-manager/blob/main/images/employee-tasks.png)

5. Specific Task Page: Within My Tasks page or from the displayed tasks in the profile page, the signed-in employee can view a specific task with its details like the project's name, task's name, task's description, and task's status, which can be changed to indicate the current status of the task. When the status "completed" is selected, the task's project's progress is recalculated automatically from the backend to reflect that change. 

![](https://github.com/saeddaoud/project-manager/blob/main/images/employee-task.png)
