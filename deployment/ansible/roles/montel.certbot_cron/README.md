Certbot role, cron flavour
===========

- version 1 by Lauri, based on montel.certbot


Description
----

Runs `certbot renew` with cron. Every week. Adds mailto variable, so working sendmail setup is good to have


Usage
----
```
    - {role: montel.certbot_cron, become: True, cron_mailto: lauri@montel.fi}
```