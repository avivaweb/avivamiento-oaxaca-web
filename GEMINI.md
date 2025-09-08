# Avivamiento Web Project: Roadmap and Development Guide

## Project Overview

This document serves as the single source of truth for the "Avivamiento" web project. It outlines our development journey, current status, future roadmap, and technical conventions. Our mission is to create a scalable, secure, and functional digital ecosystem that reflects the church's vision of sharing its message through technology.

---

## Phase 1: MVP Foundation (Completed)

This initial phase focused on building a solid foundation with a modern technology stack. All objectives in this phase have been successfully met.

### Key Achievements:

*   **Technology Stack:**
    *   **Frontend:** React with Vite for a fast and efficient development experience.
    *   **Backend:** Supabase (BaaS) for database, authentication, and real-time functionalities.
    *   **Styling:** Tailwind CSS for a utility-first styling workflow.
    *   **UI Components:** Radix UI for accessible and unstyled components.

*   **Database and CRUD Functionality:**
    *   **Supabase Setup:** Configured and connected the Supabase client to the application.
    *   **Database Schema:** Created tables for key modules, including `events`, `testimonies`, and `blog_posts`.
    *   **Full-Stack CRUD:** Implemented full Create, Read, Update, and Delete (CRUD) operations for all main modules.

*   **Authentication and Security:**
    *   **User Authentication:** Integrated Supabase Auth for user registration, login, and session management.
    *   **Row-Level Security (RLS):** Implemented RLS policies in Supabase to ensure that users can only access and modify their own data.
    *   **Protected Routes:** Created protected routes that require authentication to access certain parts of the application.

*   **UI/UX Improvements:**
    *   **Component Library:** Developed a set of reusable and accessible UI components using Radix UI and Tailwind CSS.
    *   **Consistent Design:** Applied a consistent design system across the application, following the brand's color palette and style guide.
    *   **Improved User Experience:** Enhanced the overall user experience with a more intuitive and responsive interface.

---

## Phase 2: Headless CMS Integration (In Progress)

To empower the content team and streamline content management, we are integrating a headless CMS. This will allow for easy updates to the website's content without requiring developer intervention.

### Selected CMS: Strapi

*   **Strapi** has been chosen as our headless CMS due to its flexibility, ease of use, and powerful content modeling features.

### Current Task:

*   **Setup and Configuration:**
    *   Install and configure a new Strapi project.
    *   Define the necessary Content Types (e.g., `articles`, `pages`, `events`).
    *   Configure roles and permissions for content editors.

---

## Phase 3: Advanced Features (Pending)

This phase will focus on adding advanced features to enhance user engagement and provide more value to the community.

### Pending Tasks:

*   **E-commerce for "Tienda":**
    *   Integrate a shopping cart and checkout system (e.g., with Stripe or Snipcart).
    *   Develop a product management interface in Strapi.
*   **E-learning for "Escuela de Teología":**
    *   Develop a simple Learning Management System (LMS) to manage courses, lessons, and student progress.
    *   Integrate video hosting for course content.
*   **Interactive "Grupos Familiares" Locator:**
    *   Create a map-based interface to help users find family groups near them.
    *   Develop a management interface for group leaders.
*   **Advanced SEO and Analytics:**
    *   Implement a comprehensive SEO strategy, including dynamic sitemaps and structured data.
    *   Set up advanced analytics with Google Analytics 4 to track key metrics and user behavior.

---

## Technical Stack & Conventions

*   **Stack:** React, Vite, Supabase, Strapi, Radix UI, Tailwind CSS.
*   **State Management:** React Context API for global state.
*   **API Communication:** Use `fetch` or a lightweight library like `axios` for API calls to Strapi.
*   **Security:** API keys and sensitive information must be stored in environment variables (`.env`).
*   **Code Style:** Follow the existing code style and formatting. Use the provided ESLint configuration to maintain consistency.
