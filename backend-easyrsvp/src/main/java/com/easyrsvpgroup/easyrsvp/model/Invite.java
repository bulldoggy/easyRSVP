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
    private String ownerName;
    @Getter
    @Setter
    private String eventDetails;
    @Getter
    @Setter
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
    private String timezone;
    @Getter
    @Setter
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "invite", cascade=CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    private List<Response> responses;
}
