package com.easyrsvpgroup.easyrsvp.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class InviteCreateDTO {
    private String ownerName;
    private String eventDetails;
    private String eventAddress;
    private Date eventDate;
    private String timezone;
}
