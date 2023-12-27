package com.easyrsvpgroup.easyrsvp.service;

import com.easyrsvpgroup.easyrsvp.model.Invite;
import java.util.List;

public interface InviteService {
    public Invite saveInvite(Invite invite);
    public Invite findByInviteCode(String inviteCode);
    public Invite findByResponseCode(String responseCode);
    public void deleteInvite(Invite invite);
    public Invite updateInvite(Invite invite);
    public List<Invite> getAllInvites();
    public void deleteExpiredInvites();
}
