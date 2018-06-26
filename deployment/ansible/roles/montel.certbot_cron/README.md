Certbot role, cron flavour
===========

- version 1 by Lauri, based on montel.certbot


Description
----

Runs `certbot renew` with cron. Every week.


Usage
----
```
    - {role: montel.certbot_cron, become: True, cron_mailto: lauri@montel.fi}
```