# Config

## Configure **`firewalld`** for http
🔗 [RHEL firewalld Docs](https://www.redhat.com/en/blog/firewalld-linux-firewall)

By default, `firewalld` does not allow http requests.

```bash
$ sudo firewall-cmd --add-service=http --permanent

$ sudo firewall-cmd --reload
```

## SELinux
🔗 [RHEL SELinux Docs](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/using_selinux/index)

SELinux is enabled by default on RHEL (*enforcing mode*) and comes with a lot of default security options that should not be carelessly disabled (*permissive mode*).

However, when SELinux enforcing mode is enabled, outbound network connections are restricted by default. This means that services like Nginx are not permitted to make outbound requests e.g. `proxy_pass`

> connect() to 127.0.0.1:8080 failed (13: Permission denied)

Instead of setting SELinux to permissive mode, we can simply allow services to make outbound connections using TCP:

```bash
$ sudo setsebool -P httpd_can_network_connect on
```
