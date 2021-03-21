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

1. Profile Page: when a user with the role manager signs in, they will be redirected to their profile page, that displays their avatar, personal information (name and email address), and the last 3 active projects.

![](https://github.com/saeddaoud/project-manager/blob/main/images/manager-profile-1.png)

#### For Supervisors
#### For Employees
