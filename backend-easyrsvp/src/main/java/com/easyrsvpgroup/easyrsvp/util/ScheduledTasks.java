package com.easyrsvpgroup.easyrsvp.util;

import com.easyrsvpgroup.easyrsvp.service.InviteService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    @Autowired
    private InviteService inviteService;

    @Scheduled(cron = "* * 1 * * SUN") // Cron expression for running every minute
    public void execute() {
        inviteService.deleteExpiredInvites();
    }
}