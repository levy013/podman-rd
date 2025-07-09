# TODOs
- [x] Figure out Application URLs
    - Solved w/ reverse proxy

- [x] Figure out CADConfig.json

- [x] Install Podman GUI and work
    - Unnecessary for the current workflow (esp w/ the rollout script) 
    - Maybe pulling images down to work on them locally but right now it's not something I've looked into.

- [x] Look into Container auto starting after server patching/restarting
	- Working through a couple solutions, but successfully implemented with systemd unit file and by deploying container directly as system (root) user

- [x] Generic CAD user to manage apps
    - Running apps under your own user doesn't really make sense... just created 'CAD' user to deploy from for now

- [ ] Include a nuget.config file to identify the private stream via URL and credentials.

- [ ] Condense containerization cmds into PS script (make sure script removes .tar after we scp to server)

- [ ] Should we consider setting up a private registry? That way everyone can push/pull from here. We can host this on any server.

- [ ] Jonathan: Re-image uit1446
