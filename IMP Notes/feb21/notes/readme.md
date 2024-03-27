# One Note

## requirements

- User
  - login
    - POST /user/login
  - registration
    - POST /user/register
  - forgot password
    - POST /user/forgot-password
  - change password
    - PUT /user/change-password
- Note
  - add
    - POST /note
  - list
    - GET /note
  - search
    - GET /search
  - edit
    - PUT /note/:id
  - delete
    - DELETE /note/:id
  - make the note public
    - PATCH /note/:id
