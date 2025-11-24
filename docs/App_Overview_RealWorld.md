# Application Overview – RealWorld (Conduit)

## 1. System Under Test (SUT)

For this Software Quality Engineering project, the chosen application is the **RealWorld "Conduit" app**.

We are using:
- **Frontend (UI)**: React/Redux RealWorld implementation (running locally)
  - Repo: `https://github.com/gothinkster/react-redux-realworld-example-app`
  - Local dev URL: `http://localhost:4100/`
- **Backend (API)**: Hosted RealWorld API
  - Base URL: `https://conduit.productionready.io/api`

The React frontend communicates with the hosted backend via HTTP/JSON APIs.

---

## 2. Technology Stack

### 2.1 Frontend
- **Framework**: React + Redux
- **Language**: JavaScript (ES6)
- **State Management**: Redux with custom middleware
- **HTTP Client**: `superagent` wrapped in `agent.js`
- **Routing**: React Router

### 2.2 Backend (Hosted API)
- **Base URL**: `https://conduit.productionready.io/api`
- **Style**: RESTful JSON API
- **Features**:
  - User registration & authentication (JWT)
  - Article CRUD (Create, Read, Update, Delete)
  - Comments on articles
  - Favorites (like) system
  - Tags

> For this project, we treat the backend as a black box (hosted SUT). We do not modify its code; we test it via API calls.

---

## 3. Main Features / User Flows (Focus for Testing)

We focus on the following **end-to-end flows**:

- **Authentication**
  - Register a new user
  - Login with existing user
  - Logout

- **Articles**
  - View global article feed
  - View article details
  - Create a new article (title, description, body, tags)

- **Comments**
  - Add a comment to an article

- **Tags & Filters**
  - View popular tags
  - Filter articles by tag

These flows will be the basis for **black-box UI tests (Cypress/Selenium)** and **black-box API tests**.

---

## 4. Architecture Overview

```text
[Browser / UI]
    |  React + Redux
    |  (http://localhost:4100)
    v
[Frontend JS app]
    |  HTTP requests (superagent)
    |  (Base URL: https://conduit.productionready.io/api)
    v
[Hosted RealWorld API]
    |  Backend implementation (black-box)
    |  Database (managed by provider)
    v
[Persistent Data Store]
```

- The **frontend** is served locally via `npm start` (development server).
- All data operations (login, articles, comments, tags) are performed against the **hosted backend API**.
- The frontend is stateless aside from browser storage (localStorage/JWT).

---

## 5. Key Frontend Files (Relevant for Testing)

- `src/agent.js`
  - Defines `API_ROOT` and wraps HTTP calls (GET/POST/PUT/DELETE).
  - Currently configured as:
    ```js
    const API_ROOT = 'https://conduit.productionready.io/api';
    ```

- `src/middleware.js`
  - Custom Redux middleware to handle async actions and promises.
  - Contains global error handling for failed API calls.

- `src/reducers/articleList.js`
  - Manages article list state (global feed, filters, pagination).

- `src/reducers/home.js`
  - Manages home page specific state (popular tags).

These files are good candidates for **white-box unit tests** (reducers, middleware behavior) in addition to black-box UI tests.

---

## 6. Runtime URLs

- **Frontend (local)**: `http://localhost:4100/`
- **Backend (hosted API)**: `https://conduit.productionready.io/api`
  - Example endpoints:
    - `GET /articles` – list articles
    - `GET /tags` – list tags
    - `POST /users` – register
    - `POST /users/login` – login
    - `POST /articles` – create article

The frontend internally calls URLs like:
- `https://conduit.productionready.io/api/articles`
- `https://conduit.productionready.io/api/tags`

---

## 7. Scope for SQE Work Inside This Repo

Within this `realworld-sut` repository we will:
- Add automated tests (unit + UI/E2E) for the in-scope flows.
- Optionally add a CI workflow (GitHub Actions) to run these tests.
- Use this repo as the main artifact to demonstrate SQE practices (test design, automation, and CI integration).
