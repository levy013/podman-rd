# Config

## Install Podman Locally
Podman is installed on our RHEL servers by default, but it must also be installed locally to be able to build the images of our applications.

On Windows, Podman runs inside of a WSL2 container, but you can still communicate with the service via cmd or powershell. The installer should handle the setup + config of WSL if it's not already enabled on your machine.

> ℹ️ **Note**
> 
> The CLI version of podman is enough for pushing code to a remote server. May want to reconsider Podman Desktop GUI for working with images locally.


🔗 <a href="https://github.com/containers/podman/releases/download/v5.5.2/podman-5.5.2-setup.exe" target="_blank">Install Podman CLI</a>

🔗 <a href="https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md" target="_blank">Docs: Podman for Windows</a>

