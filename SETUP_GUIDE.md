# Setup Guide: Burp Suite Challenge Docker Deployment

This guide is for internal use only. Follow these steps to set up and run the challenge in Docker:

## Prerequisites
- Docker and Docker Compose installed
- Clone or copy the challenge project files to your machine

## Files Provided
- `Dockerfile` (builds and serves the React app)
- `docker-compose.yml` (service configuration, uses port 8088)
- `endpoint_wordlist.txt` (1000+ endpoints for ffuf)
- `password_wordlist.txt` (1000+ passwords for brute-forcing)

## Steps

1. **Build and Start the Container**
   Open a terminal in the project directory and run:
   ```powershell
   docker-compose up --build
   ```
   This will build the image and start the app on port 8088.

2. **Access the App**
   Go to [http://localhost:8088](http://localhost:8088) in your browser.

3. **Challenge Flow**
   - Players use ffuf (or similar) with `endpoint_wordlist.txt` to discover `/role-challenge`.
   - Players use Burp Suite Intruder (or similar) with `password_wordlist.txt` to brute-force credentials for the admin role.
   - The flag is revealed only for the correct admin credentials on `/role-challenge`.

4. **Resetting the Environment**
   To stop and remove containers:
   ```powershell
   docker-compose down
   ```
   To rebuild after code changes:
   ```powershell
   docker-compose up --build
   ```


## Notes
- The app runs on port 8088 (not 3000/5000/default).
- Wordlists are in the project root for easy access.
- No backend server is required; all logic is in the React frontend.
- For troubleshooting, check container logs:
   ```powershell
   docker-compose logs
   ```
- If you want to run the app locally (not in Docker), you must install dependencies first:
   ```powershell
   npm install
   ```
  This will create the `node_modules` folder required for local development and running scripts.

---
For questions or issues, contact the challenge maintainer.
