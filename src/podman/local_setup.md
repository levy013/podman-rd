# Local Setup

## Install Podman Locally
> ℹ️ **Note**
> 
> Podman is installed on our RHEL servers by default, but it must also be installed locally to be able to build the images of our applications.

🔗 <a href="https://github.com/containers/podman/releases/download/v5.5.2/podman-5.5.2-setup.exe" target="_blank">Install Podman CLI</a>

> I went with the CLI version since this workflow really only requires that we build the image locally

On Windows, Podman runs inside of a WSL2 container, but you can still communicate with the service via cmd or powershell. The installer should handle the setup + config of WSL if it's not already enabled on your machine.

[Podman for Windows](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md)

