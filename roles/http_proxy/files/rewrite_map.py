#!/usr/bin/env python3
import grp
import sys
import rewrite_map_config as cfg

while sys.stdin:
    hostname = ""
    try:
        username = sys.stdin.readline().strip()   ## It is very important to use strip!
        if cfg.DEBUG:
            print("username: ", username)

        if username:
            for group in cfg.target_groups:
                if cfg.DEBUG:
                    print("Checking group: ", group)
                    print("\t", grp.getgrnam(group).gr_mem)

                if username in grp.getgrnam(group).gr_mem:
                    hostname = cfg.target_groups[group]
                    break

        if not hostname:
            hostname = cfg.default_hostname

    except:
        hostname = cfg.default_hostname

    print(hostname)
    sys.stdout.flush()
    if cfg.DEBUG:
        break
