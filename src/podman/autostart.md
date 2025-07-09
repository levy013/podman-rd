# Autostart
> ℹ️ **Note** 
>
> The goal here is to ensure that if our servers are restarted (*gracefully or not*) that our containers will start back up without human intervention.
>
> There are a few different ways to achieve this.

## Method 1: Running container under system(root)
> ℹ️ **Note** 
>
> This is not advised. The nice thing about podman is that it allows us to run rootless containers in the first place...

> ⛔ **Requirements** 
>
> 🏷️ [Push Image to Remote Server](../localenv/push_to_remote_server.md)

### 1. Share image with system/root user
```bash
$ podman image scp USERNAME@localhost::$IMAGE root@localhost::
```

### 2. Navigate to containers tab and run container with these mods:
- owner = system
- restart policy = always
- integration / port mapping = host: 8080 container: 8080 (just match dockerfile)


## Method 2: Setting up container to run as a systemd service
> ℹ️ **Note**
>
> Following this guide from RHEL:
>
> 🔗 <a href="https://www.redhat.com/en/blog/container-systemd-persist-reboot" target="_blank">Configure a container to start automatically as a systemd service</a>
>
> This method is technically deprecated, though many users still prefer this approach - it's now recommended to use Quadlets when interacting with systemd

### 1. Mkdir for systemd file
> ⚠️**Warning**
>
> This only needs to be done once. If this is a new server (assuming it hasn't been done)

```bash
$ mkdir -p ~/.config/systemd/user/
```

### 2. Start a container
🏷️ [Running Containers](../podman/running_containers.md)

### 3. Generate systemd files for the running container 
```bash
$ podman generate systemd --new --files --name myapp
```

### 4. Stop the container
```bash
$ podman stop myapp && podman rm -a && podman volume prune myapp
```

### 5. Copy unit file into dir
```bash
$ cp -Z container-myapp.service ~/.config/systemd/user/
```

### 6. Reload user level systemctl daemon
```bash
$ systemctl --user daemon-reload
```

We can start container using systemd now instead 
```bash
$ systemctl --user start container-myapp.service
```

### 7. Add to start/stop of system 
#### Add
```bash
$ systemctl --user enable container-cadmq-api.service
```

#### Remove
```bash
$ systemctl --user stop container-cadmq-api.service
```

## Method 3: Quadlets
### ... 🦗
