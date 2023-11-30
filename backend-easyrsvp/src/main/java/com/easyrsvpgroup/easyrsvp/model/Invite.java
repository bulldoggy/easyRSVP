package com.easyrsvpgroup.easyrsvp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.UUID;

@Entity
@NoArgsConstructor
public class Invite {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID inviteId;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String details;
    @Getter
    @Setter
    private String address;
    @Getter
    @Setter
    @Temporal(TemporalType.TIMESTAMP)
    private Date eventDate;
    @Getter
    @Setter
    private String inviteCode;
    @Getter
    @Setter
    private String responseCode;
    @Getter
    @Setter
    @Temporal(TemporalType.DATE)
    private Date dateCreated;
}
