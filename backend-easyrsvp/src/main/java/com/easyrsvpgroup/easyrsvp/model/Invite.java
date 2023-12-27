package com.easyrsvpgroup.easyrsvp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Table(name = "invite")
public class Invite {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Getter
    private UUID inviteId;
    @Getter
    @Setter
    @Column(length = 511)
    private String ownerName;
    @Getter
    @Setter
    @Column(length = 2047)
    private String eventDetails;
    @Getter
    @Setter
    @Column(length = 1023)
    private String eventAddress;
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
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Getter
    @Setter
    @Column(length = 255)
    private String timezone;
    @Getter
    @Setter
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "invite", cascade=CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Response> responses;
}
