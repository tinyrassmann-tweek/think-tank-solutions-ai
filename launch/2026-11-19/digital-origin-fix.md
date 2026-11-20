# Think Tank Digital lead-origin correction

The branded landing form returned HTTP 403 because the backend compared the browser Origin host against the internal Cloud Run Host header after the Firebase rewrite.

Revision `think-tank-digital-00002-mnj` replaces that equality with an explicit HTTPS origin allowlist for the existing branded domain, Firebase origins, and the service's own Cloud Run origins. Foreign origins remain rejected. Catalog, prices, product files and database rules are unchanged.

Source SHA-256 before: `0f0ed9a90ecfe64dad6c61e2b96ebca936c2ded5117b76a35adbd62280b26ee2`

Source SHA-256 after: `d2f3d0c10b9c07dbe52af937b43839bf832a143561080af9ad3398a00602cf25`

Rollback revision: `think-tank-digital-00001-xt2`.

The current Cloud Run build retains the complete deployed source archive in the existing project's source bucket. No credentials or customer records are included here.
