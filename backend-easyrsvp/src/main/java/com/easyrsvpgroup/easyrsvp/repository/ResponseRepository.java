package com.easyrsvpgroup.easyrsvp.repository;

import com.easyrsvpgroup.easyrsvp.model.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface ResponseRepository extends JpaRepository<Response, UUID> {
    @Query("SELECT r FROM Response r WHERE r.guestCode LIKE ?1")
    Response findResponseByGuestUniqueCode(String guestUniqueCode);
}
