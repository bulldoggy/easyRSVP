package com.easyrsvpgroup.easyrsvp.model;

import com.easyrsvpgroup.easyrsvp.enumeration.Decision;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Table(name = "response")
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID responseId;
    @Getter
    @Setter
    private String guestName;
    @Getter
    @Setter
    private String guestMobile;
    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    private Decision guestDecision;
    @Getter
    @Setter
    private String guestNotes;
    @Getter
    @Setter
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    private Invite invite;
    @Getter
    @Setter
    private String guestCode;
    @Getter
    @Setter
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModified;
}
