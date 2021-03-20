# Project M
## This is a fullstack project manager web application using the MERN (MongoDB, Express, React, and Node) stack with role-specific (managers, supervisors, and employees) privileges.
### Key Features: 
* Allow users to register accounts and used the credentials to login later to their accounts.
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
