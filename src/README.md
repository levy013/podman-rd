# Introduction
## Podman R&D
https://uit1446:9090/podman

### Workflow
- Build image for app locally and push to remote server.
- In the future we can try leveraging auto updates for automatic rollouts on containers running specific images.

## Step 1: Install Podman Locally
Podman must be installed on the host machine where the application(s) are built, as well as remotely on the server where the containers will run: https://podman.io/

> I went with the CLI version since this workflow really only requires that we build the image locally

On Windows, Podman runs inside of a WSL2 container, but you can still communicate with the service via cmd or powershell. The installer should handle the setup + config of WSL if it's not already enabled on your machine.

[Podman for Windows](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md)

