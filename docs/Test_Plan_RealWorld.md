# Test Plan – RealWorld (Conduit)

## 1. Introduction

### 1.1 Purpose
This test plan defines the strategy, scope, resources, and schedule for testing the **RealWorld "Conduit" application** (React frontend + hosted API) as part of a Software Quality Engineering project.

### 1.2 System Under Test (SUT)
- **Frontend (UI)**: React/Redux RealWorld implementation (local dev)
  - Repo: `https://github.com/gothinkster/react-redux-realworld-example-app`
  - URL: `http://localhost:4100/`
- **Backend (API)**: Hosted RealWorld API (black-box)
  - Base URL: `https://conduit.productionready.io/api`

The frontend communicates with the hosted backend via RESTful JSON APIs.

### 1.3 References
- RealWorld docs: https://realworld-docs.netlify.app
- App overview: `docs/App_Overview_RealWorld.md`

---

## 2. Test Objectives

### 2.1 Functional Objectives
- Verify that core user workflows work correctly:
  - User registration, login, and logout
  - Viewing the global article feed and article details
  - Creating an article
  - Adding a comment to an article
  - Viewing popular tags and filtering by tag

### 2.2 Quality Objectives
- Ensure the UI does not crash on unexpected API responses (robust error handling in reducers/middleware).
- Achieve automated test coverage on:
  - **Black-box**: UI flows (Cypress) and API behavior (HTTP tests)
  - **White-box**: Frontend logic (reducers/middleware) via unit tests
- Integrate tests into a CI pipeline (optional but recommended).

### 2.3 Success Criteria
- All smoke/E2E tests for in-scope flows pass.
- No critical UI crashes during core user flows.
- Representative unit tests exist for key reducers/middleware.

---

## 3. Test Scope

### 3.1 In-Scope Features

- **Authentication**
  - Register a new user
  - Login with valid credentials
  - Reject invalid credentials
  - Logout

- **Articles**
  - View global article feed
  - View article details
  - Create a new article (title, description, body, tags)

- **Comments**
  - Add a comment to an article

- **Tags & Filters**
  - Display popular tags
  - Filter articles by tag

### 3.2 Out-of-Scope Features

- Editing and deleting existing articles
- Deleting comments
- Following/unfollowing users
- Viewing user profiles and favorited articles
- Deep pagination edge cases and full performance/load testing

---

## 4. Test Strategy

### 4.1 Test Levels

- **Unit Testing (White-box)**
  - Scope: Frontend reducers, middleware, utility functions.
  - Tools: Jest (or similar JS unit test framework).

- **API Testing (Black-box)**
  - Scope: Hosted RealWorld API endpoints used by the frontend.
  - Tools: Jest + HTTP client (or Postman/Newman).

- **System / E2E Testing (Black-box)**
  - Scope: Full user flows through the React UI (browser automation).
  - Tools: Cypress (primary choice).

### 4.2 Test Techniques

- **Black-box**: equivalence partitioning, boundary value analysis, scenario-based testing.
- **White-box**: control flow and condition coverage in reducers/middleware.

---

## 5. Test Environment

- OS: Windows 10/11
- Node.js: v18.x
- Browser: Chrome (primary)
- Frontend: `npm start` → `http://localhost:4100/`
- Backend: `https://conduit.productionready.io/api`

---

## 6. Representative Test Cases

### 6.1 UI / E2E – Black-box (Cypress)

- **TC-UI-01: Register User (Valid)**
  - Steps: Open `/register`, fill valid data, submit.
  - Expected: User logged in, username visible in navbar.

- **TC-UI-02: Login (Valid)**
  - Steps: Open `/login`, enter valid credentials, submit.
  - Expected: Redirect to home, username visible.

- **TC-UI-03: Login (Invalid)**
  - Steps: Open `/login`, enter invalid credentials.
  - Expected: Error message, stays on login page, no crash.

- **TC-UI-04: Create Article**
  - Steps: Login, open editor, fill fields, publish.
  - Expected: Article page shows newly created article.

- **TC-UI-05: Add Comment**
  - Steps: Login, open article, add comment.
  - Expected: Comment visible under article.

- **TC-UI-06: View Feed & Tags**
  - Steps: Open home page.
  - Expected: No crash; if API returns articles/tags, they are displayed; if empty, page stays stable.

### 6.2 API – Black-box

- **TC-API-01: POST /users (Register)**
- **TC-API-02: POST /users/login (Login)**
- **TC-API-03: GET /articles (Global feed)**
- **TC-API-04: GET /tags (Tags list)**

### 6.3 Unit – White-box

- Reducers: `articleList`, `home` – handle valid and invalid payloads without throwing.
- Middleware: error handling when `error.response` is undefined.

---

## 7. Entry and Exit Criteria

### 7.1 Entry Criteria
- Frontend runs locally without build errors.
- Hosted API reachable from test machine.

### 7.2 Exit Criteria
- All planned E2E smoke tests pass.
- Unit tests for key reducers/middleware pass.
- No unresolved critical defects affecting the in-scope flows.

---

## 8. Risks & Mitigations

- **Risk**: Hosted API instability or changes.
  - *Mitigation*: Write tests that tolerate data variation (do not depend on specific article IDs).

- **Risk**: Rate limiting or abuse detection on hosted API.
  - *Mitigation*: Keep automated test frequency reasonable; avoid unnecessary loops.

---

## 9. Deliverables

- Test plan (this document).
- Cypress test suite (E2E).
- Jest unit tests for reducers/middleware.
- Optional: API tests.
- Test execution logs and screenshots.
