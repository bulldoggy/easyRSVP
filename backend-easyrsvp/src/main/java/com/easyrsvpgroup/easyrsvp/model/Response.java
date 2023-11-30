package com.easyrsvpgroup.easyrsvp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.UUID;

@Entity
@NoArgsConstructor
public class Response {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID responseId;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String mobile;
    @Getter
    @Setter
    private String decision; //Yes, No, Maybe
    @Getter
    @Setter
    private String notes;
    @Getter
    @Setter
    @ManyToOne(cascade=CascadeType.REMOVE)
    private Invite invite;
    @Getter
    @Setter
    private String uniqueCode;
    @Getter
    @Setter
    @Temporal(TemporalType.DATE)
    private Date lastModified;
}
