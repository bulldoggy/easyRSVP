package com.easyrsvpgroup.easyrsvp.dto;

import com.easyrsvpgroup.easyrsvp.enumeration.Decision;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class InviteEditDTO {
    private String inviteCode;
    private String ownerName;
    private String eventDetails;
    private String eventAddress;
    private Date eventDate;
    private String timezone;
}
