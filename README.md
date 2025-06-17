# Hostup Website

This repository contains the source code for the Hostup website. It serves as the main entry point for users to learn more about products, access documentation, and get in touch.

## Tech Stack

- [Astro](https://astro.build/) – Static site generator
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework

## Getting Started

### Prerequisites

- [git](https://git-scm.com/downloads)
- [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/hostupdev/website.git
cd website
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

### Production Build

Build the site for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The site can be deployed as a container. See the `Containerfile` and `compose.yml` for reference.

## Contributing

We welcome contributions! Please open an issue or submit a pull request for any improvements or bug fixes. Make sure your code follows the existing style and passes all checks before submitting.
