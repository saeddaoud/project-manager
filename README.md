# Project M
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

#### For Supervisors
#### For Employees
