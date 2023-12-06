package com.easyrsvpgroup.easyrsvp.dto;

import com.easyrsvpgroup.easyrsvp.enumeration.Decision;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ResponseEditDTO {
    private String guestCode;
    private String guestName;
    private String guestMobile;
    private Decision guestDecision;
    private String guestNotes;
}
