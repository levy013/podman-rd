// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.</strong> Local Environment</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="localenv/config.html"><strong aria-hidden="true">1.1.</strong> Config</a></li><li class="chapter-item expanded "><a href="localenv/building_images.html"><strong aria-hidden="true">1.2.</strong> Building Images</a></li><li class="chapter-item expanded "><a href="localenv/push_to_remote_server.html"><strong aria-hidden="true">1.3.</strong> Push Image to Remote Server</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> Podman</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="podman/config.html"><strong aria-hidden="true">2.1.</strong> Config</a></li><li class="chapter-item expanded "><a href="podman/autostart.html"><strong aria-hidden="true">2.2.</strong> Autostart</a></li><li class="chapter-item expanded "><a href="podman/dockerfiles.html"><strong aria-hidden="true">2.3.</strong> Dockerfiles</a></li><li class="chapter-item expanded "><a href="podman/running_containers.html"><strong aria-hidden="true">2.4.</strong> Running Containers</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> RHEL</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="rhel/config.html"><strong aria-hidden="true">3.1.</strong> Config</a></li><li class="chapter-item expanded "><a href="rhel/cockpit.html"><strong aria-hidden="true">3.2.</strong> Cockpit</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.3.</strong> Nginx</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="rhel/nginx/installation.html"><strong aria-hidden="true">3.3.1.</strong> Installation</a></li><li class="chapter-item expanded "><a href="rhel/nginx/reverse_proxy.html"><strong aria-hidden="true">3.3.2.</strong> Reverse Proxy</a></li><li class="chapter-item expanded "><a href="rhel/nginx/logs.html"><strong aria-hidden="true">3.3.3.</strong> Logs</a></li></ol></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.</strong> Quick Start</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="quickstart/containerize_an_app.html"><strong aria-hidden="true">4.1.</strong> Containerize an Application</a></li></ol></li><li class="chapter-item expanded "><a href="sysadmin/action_items.html"><strong aria-hidden="true">5.</strong> Sysadmin</a></li><li class="chapter-item expanded "><a href="todos/todos.html"><strong aria-hidden="true">6.</strong> TODOs</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
