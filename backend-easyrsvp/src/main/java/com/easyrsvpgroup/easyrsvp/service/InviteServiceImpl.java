package com.easyrsvpgroup.easyrsvp.service;

import com.easyrsvpgroup.easyrsvp.model.Invite;
import com.easyrsvpgroup.easyrsvp.repository.InviteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InviteServiceImpl implements InviteService{

    @Autowired
    private InviteRepository inviteRepository;

    @Override
    public Invite saveInvite(Invite invite) {
        return inviteRepository.save(invite);
    }

    @Override
    public Invite findByInviteCode(String inviteCode) {
        return inviteRepository.findInviteByInviteCode(inviteCode);
    }

    @Override
    public Invite findByResponseCode(String responseCode) {
        return inviteRepository.findInviteByResponseCode(responseCode);
    }

    @Override
    public void deleteInvite(Invite invite) {
        inviteRepository.delete(invite);
    }

    @Override
    public Invite updateInvite(Invite invite) {
        Invite i = findByInviteCode(invite.getInviteCode());
        i.setOwnerName(invite.getOwnerName());
        i.setEventDetails(invite.getEventDetails());
        i.setEventAddress(invite.getEventAddress());
        i.setEventDate(invite.getEventDate());
        i.setTimezone(invite.getTimezone());
        i.setResponses(invite.getResponses());

        return inviteRepository.save(i);
    }

    @Override
    public List<Invite> getAllInvites() {
        return inviteRepository.findAll();
    }
}
