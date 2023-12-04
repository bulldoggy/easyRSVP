package com.easyrsvpgroup.easyrsvp.repository;

import com.easyrsvpgroup.easyrsvp.model.Invite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface InviteRepository extends JpaRepository<Invite, UUID> {
    @Query("SELECT i FROM Invite i WHERE i.inviteCode LIKE ?1")
    Invite findInviteByInviteCode(String inviteCode);

    @Query("SELECT i FROM Invite i WHERE i.responseCode LIKE ?1")
    Invite findInviteByResponseCode(String responseCode);
}
