# 🔒 SpecterBin

## Table of Contents
- [🔒 SpecterBin](#-specterbin)
  - [Table of Contents](#table-of-contents)
  - [About SpecterBin](#about-specterbin)
  - [Key Features](#key-features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation Options](#installation-options)
      - [Option 1: Dockerized Deployment](#option-1-dockerized-deployment)
      - [Option 2: Manual Installation](#option-2-manual-installation)
  - [Usage](#usage)
  - [Security Architecture](#security-architecture)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  - [Contact](#contact)


## About SpecterBin

**SpecterBin** is a cutting-edge pastebin platform built with **privacy**, **security**, and **usability** as its core principles. Unlike conventional pastebins, SpecterBin employs **zero-knowledge encryption**, ensuring that your data remains completely private and inaccessible even to us—the developers.

Whether you're sharing sensitive code snippets, confidential notes, or brainstorming ideas, SpecterBin provides a secure, seamless, and user-friendly experience. Built using modern technologies like **MongoDB**, **React**, and **Express.js**, SpecterBin is fast, reliable, and easy to use.

> **Why choose SpecterBin?**
>
> Because your privacy matters. With features like password protection, burn-after-read functionality, and instant account creation without requiring personal information, SpecterBin empowers users to share securely while maintaining full control over their data.

## Key Features

- **Zero-Knowledge Encryption**: Data is encrypted on the client side before being uploaded, ensuring no one—not even the server—can access your content.
- **Password Protection**: All pastes are password-protected by default to enhance security. If a user does not provide a password, a strong, randomly generated password will be assigned automatically to restrict unauthorized access.
- **Burn After Read/Date**: Automatically delete pastes after they are read or expire them based on a set date/time.
- **Instant Account Creation**: Create an account instantly without needing to provide any personal information.
- **50+ Code Highlighting Languages**: Supports syntax highlighting for over 50 programming languages, making it perfect for developers.
- **Dockerized Deployment**: Easily deploy SpecterBin using Docker containers for scalability and consistency.
- **User-Friendly Interface**: A clean, intuitive UI ensures anyone can use SpecterBin effortlessly.

## Getting Started

Follow these steps to set up and run SpecterBin locally. You have two options: manual installation or Docker-based deployment.

### Prerequisites

Before proceeding, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community)
- **Docker**: [Install Docker](https://www.docker.com/products/docker-desktop) (required only for Dockerized deployment)
- **Git**: [Install Git](https://git-scm.com/)

### Installation Options

#### Option 1: Dockerized Deployment

1. **Clone the Repository**:
```bash
git clone https://github.com/yourusername/specterbin.git
```

2. **Navigate to the Project Directory**:
```bash
cd specterbin
```

3. **Build and Run Containers**:
```bash
docker-compose up --build
```

4. **Access SpecterBin**:
   Open your browser and navigate to `http://localhost:3000`.

#### Option 2: Manual Installation

If you prefer to set up SpecterBin manually without using Docker, please refer to the [Manual Installation Guide](docs/manual-installation.md). This guide provides step-by-step instructions to help you configure and run the application locally.

## Usage

Once SpecterBin is running, here's how you can use it:

1. **Create a Paste**:
   - Enter your text or code snippet.
   - Optionally, enter a custom password to secure your paste. If no password is provided, a strong, randomly generated password will be created automatically.
   - Enable additional options such as expiration time if desired.
   - Click "Create" to generate a unique URL for your paste. If a random password was generated, it will be displayed alongside the URL—make sure to save it securely, as it cannot be recovered later.

2. **View a Paste**:
   - Visit the generated URL to view the paste.
   - If the paste is password-protected, enter the correct password to unlock it.

3. **Manage Your Pastes with an Instant Account**:
   - SpecterBin allows you to create an instant account without providing any personal information. Upon account creation, a unique 36-digit account number is generated automatically.
   - Use this account number to manage multiple pastes under one namespace. Simply log in using your account number to access and organize all your pastes in one place.
   - Note: Since no personal information is required, ensure you save your account number in a secure location. If lost, it cannot be recovered.

## Security Architecture

At SpecterBin, security is our top priority. Here's how we ensure your data stays safe:

1. **Client-Side Encryption**:
   - All data is encrypted on the client side using industry-standard cryptographic algorithms before being transmitted to the server.
   - Only the user has access to the decryption keys; the server never stores unencrypted data.

2. **Password Protection**:
   - All pastes are password-protected by default, ensuring an additional layer of security.
   - Users can choose their own passwords or allow the system to generate a strong, random password automatically if none is provided.
   - Passwords are hashed and salted using bcrypt before being stored securely.

3. **Burn After Read/Date**:
   - Pastes marked as "burn after read" are automatically deleted from the database once accessed.
   - Alternatively, you can set an expiration date/time for automatic deletion.

4. **Secure Storage**:
   - Encrypted pastes are stored in a MongoDB database, ensuring data integrity and durability.

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, improving documentation, or adding new features, every contribution helps make SpecterBin better.

To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- **MongoDB**: For providing robust and scalable database solutions.
- **React**: For enabling a dynamic and responsive user interface.
- **Express.js**: For simplifying backend development with ease and flexibility.
- **Highlight.js**: For supporting syntax highlighting across 50+ programming languages.
- **Bcrypt**: For secure password hashing and storage.

## Contact

For questions, feedback, or collaboration opportunities, feel free to reach out:

- **Name**: X4Lo
- **Email**: X4Lo@pm.me
- **GitHub**: [X4Lo](https://github.com/X4Lo)
